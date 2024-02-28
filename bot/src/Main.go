package main

import (
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	connection, err := amqp.Dial("amqp://" + os.Getenv("MQUSER") + ":" + os.Getenv("MQPASS") + "@rabbitmq:5672/")
	if err != nil {
		panic(err)
	}
	defer connection.Close()
}
