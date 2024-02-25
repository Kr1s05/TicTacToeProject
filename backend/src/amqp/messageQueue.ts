import amqplib from "amqplib";
import { env } from "process";

const queue = "game";

export async function setupMessaging() {
  const conn = await amqplib.connect(
    "amqp://" + env.MQUSER + ":" + env.MQPASS + "@rabbitmq"
  );

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);
}
