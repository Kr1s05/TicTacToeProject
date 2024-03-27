package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"

	"encoding/json"
)

func main() {
	connection, errCon := amqp.Dial("amqp://" + os.Getenv("MQUSER") + ":" + os.Getenv("MQPASS") + "@rabbitmq:5672/")
	fail(errCon, "Connection error")
	defer connection.Close()

	//receiving channel
	channel1, errCh := connection.Channel()
	fail(errCh, "Channel error")
	_, errQ := channel1.QueueDeclare("bot-queue", false, false, false, false, nil)
	fail(errQ, "Queue error")
	messages, errM := channel1.Consume("bot-queue", "game-consumer", false, false, false, false, nil)
	fail(errM, "Consume error")

	//publishing channel
	channel2, errCh2 := connection.Channel()
	fail(errCh2, "Channel error")
	_, errQ2 := channel2.QueueDeclare("bot-queue", false, false, false, false, nil)
	fail(errQ2, "Queue error")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	go func() {
		channel, errCh := connection.Channel()
		fail(errCh, "Channel error")
		errEx := channel.ExchangeDeclare("game-bot", "direct", false, false, false, false, nil)
		fail(errEx, "Exchange error")
		_, errQ := channel.QueueDeclare("bot-queue", false, false, false, false, nil)
		fail(errQ, "Queue error")
		errB := channel.QueueBind("bot-queue", "game-queue", "game-bot", false, nil)
		fail(errB, "BindError")
		for {
			m := <-messages
			var gs gameState
			json.Unmarshal(m.Body, &gs)
			bestMove := findBestMove([9]string(gs.Board), gs.Turn)
			res, _ := json.Marshal(gameResponse{RoomId: gs.RoomId, Index: bestMove})
			msg := amqp.Publishing{
				DeliveryMode: amqp.Persistent,
				Timestamp:    time.Now(),
				ContentType:  "text/plain",
				Body:         []byte(res),
			}
			channel2.PublishWithContext(ctx, "", "backend-queue", false, false, msg)
			m.Ack(false)
		}
	}()

	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGTERM, syscall.SIGINT)
	<-sigCh
}

func fail(err error, message string) {
	if err != nil {
		println(message)
		panic(err.Error())
	}
}

type gameState struct {
	RoomId string
	Turn   string
	Board  []string
}

type gameResponse struct {
	RoomId string
	Index  int
}
