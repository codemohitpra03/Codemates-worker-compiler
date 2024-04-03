
# CodeMates Worker Service for Processing code execution request.





*Worker Service for Real-Time Collaborative Code Editor and Compiler Platform*

**Overview:**
The Worker Service manages code by being a *consumer* for *message queue*.




**Technologies Used:**
- Backend: Node.js, Express.js, Kafka
- Languages: C++, Java, JavaScript, Python



---




## Run Locally

* Start Zookeper Container and expose PORT ```2181```.
```bash
docker run -p 2181:2181 zookeeper
```

* Start Kafka Container, expose PORT ```9092``` and setup ENV variables.
```bash
docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka
```
* Clone the project

```bash
  git clone https://github.com/codemohitpra03/Codemates-worker-compiler
```

Go to the project directory

```bash
  cd Codemates-worker-compiler
```

Run the docker-compose file

```bash
  docker-compose up --build
```





This spins up only the backend server of CodeMates

To run Other services, Go to below listed repositories and follow the instructions


* https://github.com/codemohitpra03/CodeMates
* https://github.com/codemohitpra03/Codemates-server


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`KAFKA_IP` IP address of machine where kafka is running. Pass this as the private ip while running locally.




## Authors

- [@codemohitpra03](https://www.github.com/codemohitpra03)

