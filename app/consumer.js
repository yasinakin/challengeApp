const amqp = require("amqplib");
const queueName = process.argv[2] || "jobsQueue";
const Redis = require("ioredis");
const data=require("./data.json")
const writeToMongoDB= require("./writeToMongo")
connect_rabbitmq();

async function connect_rabbitmq() {
  try {
    //rabbitmq connection
    
    const connection = await amqp.connect("amqp://root:admin@localhost:5672");
    const channel = await connection.createChannel();
    const assertion = await channel.assertQueue(queueName);

    //redis connection
    const redis = new Redis();
    // Mesajın Alınması...
    console.log("Mesaj bekleniyor...");
    channel.consume(queueName, message => {
        const messageInfo = JSON.parse(message.content.toString())
        const userInfo = data.find(u => u.id == messageInfo.description)
        if(userInfo){
            console.log("İşlenen Kayit", userInfo);
            redis.set(`user_${userInfo.id}`,JSON.stringify(userInfo),(err,status) => {              
              if(!err){
                console.log("status",status)
                channel.ack(message);
              }
            })           
            //mongodb insert
            writeToMongoDB.main()
        }
    });
  } catch (error) {
    console.log("Error", error);
    process.exit(1);

  }
}
