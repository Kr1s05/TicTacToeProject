import amqplib, { Connection } from "amqplib";
import { env } from "process";

const backendQueue = "backend-queue";
const botQueue = "bot-queue";

let conn: Connection;

export async function setupMessaging() {
  conn = await amqplib.connect(
    "amqp://" + env.MQUSER + ":" + env.MQPASS + "@rabbitmq"
  );
  process.once("SIGINT", async () => {
    await conn.close();
  });
}

export async function Consumer(f: (msg: object) => void) {
  const channel = await conn.createChannel();
  await channel.assertQueue(backendQueue, { durable: false });
  await channel.consume(
    backendQueue,
    (msg) => {
      if (msg) f(JSON.parse(msg.content.toString()));
    },
    { noAck: true }
  );
}

export async function Publisher(): Promise<(msg: object) => void> {
  const channel = await conn.createChannel();
  await channel.assertQueue(botQueue, { durable: false });
  return (msg: object) => {
    channel.publish("", botQueue, Buffer.from(JSON.stringify(msg)));
  };
}
