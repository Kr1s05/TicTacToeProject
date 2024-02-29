import amqplib from "amqplib";
import { env } from "process";

const queue = "game-queue";
const exchange = "game";

export async function setupMessaging() {
  const conn = await amqplib.connect(
    "amqp://" + env.MQUSER + ":" + env.MQPASS + "@rabbitmq"
  );

  const channel = await conn.createChannel();
  await channel.assertQueue(queue, {durable:false});
  await channel.assertExchange(exchange, 'direct', { durable: false });
  await channel.bindQueue(queue, exchange, "game-queue")

  channel.publish(exchange, 'game-queue', Buffer.from(JSON.stringify({Id:"adadadada",Board:["x","o","","",""],Turn:"x", Maximizing:"x"})));
}

