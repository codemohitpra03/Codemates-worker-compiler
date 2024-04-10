const {Kafka} = require('kafkajs')
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { write_to_file, executePythonCode, executeJavaCode, executeNodejsCode, executeCppCode, write_to_in_file } = require('./code_runners');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 8000;

async function run(){
    try {
        const kafka = new Kafka({
            "clientId":"codemates",
            "brokers":[`${process.env.kafkaip}:9092`]
        })

        const consumer = kafka.consumer({"groupId":"test"})

        console.log("connecting....");
        await consumer.connect()
        console.log("connected");
        
        

        await consumer.subscribe({
            "topic":"users",
            "fromBeginning":true
        })

        await consumer.run({
            // "eachMessage": async ({topic, partition, message}) => {
            //     console.log(message.value.toString(),"topic - ",topic, "partition - ",partition)
            // }
            "eachMessage": async ({topic, partition, message}) => {
                const payload = JSON.parse(message.value)

                console.log(message.value.toString(),"topic - ",topic, "partition - ",partition)
                // sendCode(message.value.toString() + "kafka se aaya hai")
                sendCode(payload)
            }
        })
    } catch (error) {
        console.log("error happenend" , error );
    }finally{
        
    }
}
run()




let clients = {}





function eventsHandler(request, response, next) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
    
    // const data = `data: ${JSON.stringify({info:"data"})}\n`;
  
    // response.write(data);
    console.log(request.query);
    const {clientId} = request.query;
    
    // const newClient = {
    //   id: clientId,
    //   response
    // };
  
    clients[clientId] = response
    // console.log(clients);
    
    // request.on('close', () => {
    //     console.log(`${clients} Connection closed`);
    //     client = null;
    // });
}

// ...

async function sendCode(payload) {
    // clients[0].response.write('event: connected\n');
    console.log(payload);
    const {code,roomId,lang,socketId,input} = payload

    // await write_to_file('python',code)
    let result = ""
    
    if(lang === 'python') {
        await write_to_in_file('python',input)
        await write_to_file('python',code)
        result = await executePythonCode()
    }
    
    if(lang === 'cpp') {
        await write_to_in_file('cpp',input)
        await write_to_file('cpp',code)
        result = await executeCppCode()
    }
    
    if(lang === 'java') {
        await write_to_in_file('java',input)
        await write_to_file('java',code)
        result = await executeJavaCode()
    }
    
    if(lang === 'js') {
        await write_to_in_file('js',input)
        await write_to_file('js',code)
        result = await executeNodejsCode()
    }

    console.log(result,"exec code");
    await clients[socketId].write(`data: ${JSON.stringify(result)}\n\n`)
}

async function compileCode(request, response, next) {
    const newFact = request.body.code;
    console.log(newFact);
    
    client.response.write(`data: ${JSON.stringify(newFact + " milgay code")}\n\n`)
    
}

app.post('/compile', compileCode);

app.get('/events', eventsHandler);



app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
})