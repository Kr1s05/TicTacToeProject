package main

import (
	"os"

	amqp "github.com/rabbitmq/amqp091-go"

	"encoding/json"
)

func main() {
	connection, errCon := amqp.Dial("amqp://" + os.Getenv("MQUSER") + ":" + os.Getenv("MQPASS") + "@rabbitmq:5672/")
	fail(errCon, "Connection error")
	defer connection.Close()

	channel, errCh := connection.Channel()
	fail(errCh, "Channel error")

	errEx := channel.ExchangeDeclare("game", "direct", false, false, false, false, nil)
	fail(errEx, "Exchange error")

	_, errQ := channel.QueueDeclare("game-queue", false, false, false, false, nil)
	fail(errQ, "Queue error")

	errB := channel.QueueBind("game-queue", "game-queue", "game", false, nil)
	fail(errB, "BindError")

	messages, errM := channel.Consume("game-queue", "game-consumer", false, false, false, false, nil)
	fail(errM, "Consume error")

	go func() {
		for {
			m := <-messages
			var gs gameState
			json.Unmarshal(m.Body, &gs)
			println(gs.Board)
			println(gs.Id)
			m.Ack(false)
		}
	}()

	ch1 := make(chan int)
	<-ch1

}

func fail(err error, message string) {
	if err != nil {
		println(message)
		panic(err.Error())
	}
}

type gameState struct {
	Id         string
	Turn       string
	Maximizing string
	Board      []string
}
