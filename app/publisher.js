const amqp = require("amqplib");

const message = {
  description: "Bu bir test mesajidir.."
};
const data = require("./data2.json")
const queueName = process.argv[2] || "jobsQueue";

connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    //rabbitmq connection
    const connection = await amqp.connect("amqp://root:admin@localhost:5672");//amqp://user:pass@host.com/vhost    
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);   
    data.forEach(i => {
        message.description = i.id;
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
        console.log("Gonderilen Mesaj", i.id);    
    })
    /* ============= Interval.==========================================================*/
    // setInterval(() => {
    //     message.description = new Date().getTime();
    //     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
    //     console.log("Gonderilen Mesaj", message);
    // }, 1000);
    /* ============= Interval.========================================================== */

  } catch (error) {
    console.log("Error", error);
    process.exit(1);
  }
}
