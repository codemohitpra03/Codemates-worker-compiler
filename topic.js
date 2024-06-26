require('dotenv').config()
const {Kafka} = require('kafkajs')

async function run(){
    try {
        console.log(process.env);
        const kafka = new Kafka({
            "clientId":"codemates",
            "brokers":[`${process.env.kafkaip}:9092`]
        })

        const admin = kafka.admin()

        console.log("connecting....");
        await admin.connect()
        console.log("connected");
        // a-n m-z
        await admin.createTopics({
            "topics": [{
                "topic":"users",
                "numPartitions":2,
            }]
        })
        console.log("done created topics");

        await admin.disconnect()
    } catch (error) {
        console.log("error happenend" , error );
    }finally{
        process.exit(0)
    }
}

run()