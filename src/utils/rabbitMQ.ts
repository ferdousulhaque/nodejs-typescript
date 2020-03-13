import * as Amqp from "amqp-ts";
import dotenv from "dotenv";
import logger = require('./../utils/logger');

dotenv.config();

/*
 * Send transaction
 */
export const send = async () => {
    const opt = {
        credentials: require('amqplib').credentials.plain(
            'guest',
            'guest'
        )
    };
    var connection = new Amqp.Connection(process.env.PUSH_QUEUE_URL, opt);
    logger.debug(connection.isConnected);

    connection.on("open_connection", ()=> {
        logger.debug("open_connection");
    });

    connection.on("close_connection", ()=> {
        logger.debug("close_connection");
    });

    connection.on("lost_connection", ()=> {
        logger.debug("lost_connection");
    });

    

    connection.on("trying_connect", ()=> {
        logger.debug("trying_connect");
    });
    
    connection.on("re_established_connection", ()=> {
        logger.debug("re_established_connection");
    });

    connection.on("error_connection", (err)=> {
        logger.debug("error_connection"+err);
    });
    
    var exchange = connection.declareExchange("ExchangeName");
    var queue = connection.declareQueue("notification");
    queue.bind(exchange).then((succ) => {
        logger.debug(succ);
    }).catch(err => logger.debug(err));
    // it is possible that the following message is not received because
    // it can be sent before the queue, binding or consumer exist
    var msg = new Amqp.Message("Ferdous");
    await exchange.send(msg);
    await logger.debug("Message send");
}

/*
 * Receive
 */
export const receive = async () => {
    // var connection = new Amqp.Connection(process.env.PUSH_QUEUE_URL);
    // var exchange = connection.declareExchange("ExchangeName");
    // var queue = connection.declareQueue("notification");
    // queue.bind(exchange);
    // await queue.activateConsumer((message) => {
    //     logger.debug("Message received: " + message.getContent());
    // });

    // create a new connection (async)
    const opt = {
        credentials: require('amqplib').credentials.plain(
            'guest',
            'guest'
        )
    };
    var connection = new Amqp.Connection(process.env.PUSH_QUEUE_URL, opt);

    if(await connection.isConnected){
        var exchange = connection.declareExchange("ExchangeName");
        // declare a new queue, it will be created if it does not already exist (async)
        var queue = connection.declareQueue("notification", {
            durable: false
        });
        queue.bind(exchange);
        // create a consumer function for the queue
        // this will keep running until the program is halted or is stopped with queue.stopConsumer()
        queue.activateConsumer(function (message) {
            // fake a second of work for every dot in the message
            var content = message.getContent();
            var seconds = content.split('.').length - 1;
            logger.debug("Message received: " + content);
            setTimeout(function () {
                logger.debug("[x] Done");
                message.ack(); // acknowledge that the message has been received (and processed)
            }, seconds * 1000);
        }, {
            noAck: false
        });
    }else{
        logger.error("Worker: No Service Running on "+process.env.PUSH_QUEUE_URL);
    }
}