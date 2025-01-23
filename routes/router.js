const express = require('express');
const router = express.Router();
const line = require('@line/bot-sdk');
const axios = require('axios');
const qs = require('qs');

// const path = require('path');
// require("dotenv").config({path: path.resolve(__dirname, '../.env')}); // for local dev


const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_TOKEN,
}

const SCRIPT_URL =  process.env.SCRIPT

const client = new line.messagingApi.MessagingApiClient(
   {channelAccessToken: process.env.CHANNEL_TOKEN}
);


router.post("/", line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});


router.use(express.json()); 

function viewEvent(event) {
    console.log(event);
}


// main gate
async function handleEvent(event) {
   
    if (event.type === 'postback') {
        if (event.postback.data === 'action=summary') {
            return await handleSummary(event);
    }
    } else if (event.type === 'message') {
        return await handleLog(event);
    } else if (event.type === 'follow') {
        return await handleFollow(event);
    }

    return Promise.resolve(null);
}



async function handleFollow(event) {
    return client.replyMessage(
        {replyToken: event.replyToken,
        messages: [{
            type: 'text',
            text: 'Hello! Please refer to the menu for what I can do! \nIf you want to see the full summary, please contact Pop.'
        }]}
    );
}
async function handleLog(event) {
   try {
     const commands = event.message.text.replace(" ", "").split("\n");
     const data = await axios.post(
        SCRIPT_URL,
        qs.stringify({
            type: 'log',
            id: (await client.getProfile(event.source.userId)).displayName,
            categ: commands[0].replace("Category:", ""),
            amount: commands[1].replace("Amount:", ""),
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
        return client.replyMessage({
            replyToken: event.replyToken, 
            messages: [{
                type: 'text',
                text: data.data.message
            },
            {
                type: 'text',
                text: data.data.amount
            }]
        });
   } catch (e) {
     console.error(`Error is ${e}`);
     return client.replyMessage(
         {
             replyToken: event.replyToken, 
             messages: [{
                 type: 'text',
                 text: 'An error occurred while processing your request'
             }]
         });
   }
}

async function handleSummary(event) {
    try {

        const data = await axios.post(
            SCRIPT_URL,
            qs.stringify({
                type: 'summary',
                id: (await client.getProfile(event.source.userId)).displayName,
                categ: 'Meal'
                
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
       
        const amount = data.data.amount;
        const messages = [
            {
                type: 'text',
                text: data.data.message
            }
        ]
        if (amount !== -1) {
            messages.push({
                type: 'text',
                text: amount
            })
        }
        return client.replyMessage({
            replyToken: event.replyToken, 
            messages: messages
        });
    } catch (e) {
        console.error(`Error is ${e}`);
        return client.replyMessage(
            {
                replyToken: event.replyToken, 
                messages: [{
                    type: 'text',
                    text: 'An error occurred while processing your request'
                }]
            }
        );
    }
}




module.exports = router;