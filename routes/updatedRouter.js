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


router.post("/", line.middleware(config), (req, res) => { // linemiddleware processes requests
    Promise.all(req.body.events.map(handleEvent)) // passes each event to the handler in parallel
    .then((result) => res.json(result)) 
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    })
})

router.use(express.json()) // parses incoming requests as JSON

async function handleEvent(event) {
    if (event.type === 'message') { 
        if (event.message.text.charAt(0) === 'S') {
            return await handleSummary(event)
        } else if (event.message.text.charAt(0) === 'C') {
            return await handleLog(event)
        } else {
            return await handleFollow(event)
        }
    } else if (event.type === 'follow') {
        return await handleFollow(event)
    } else if (event.type == 'postback') {
        if (event.postback.data == 'action=summary')  {
            return await handleSummary(event, all=true)
        }
    }

    return Promise.resolve(null)

}


async function handleSummary(event, all=false) { // Summarized Category: Meal
    try {
        const date = new Date()
        if (all) {
            var categ = 'ALL'
        } else {
            var categ = formatStr(event.message.text.split(':')[1].replace(" ", ""))

        }

        const data = (await axios.post(
            SCRIPT_URL,
            qs.stringify(
                {
                    type: 'summary',
                    id: (await client.getProfile(event.source.userId)).displayName,
                    categ: categ,
                    date: new Date() // gs will reconstruct this
                }),
                {headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }}
        )).data

        const amount = data.amount
        let budget; let dayLeft; let answer;
        if (categ === 'Meal') {
            const month = date.getMonth()
            const day = date.getDate()
            if (month === 2) {
                budget = 11340
                dayLeft = 29 - day
            } else if ([4,6,9,11].includes(month)) {
                budget = 12150
                dayLeft = 30 - day
            } else {
                budget = 12555
                dayLeft = 31 - day
            }

            answer = [{
                type: 'text',
                text: `You have used ${amount} with ${categ}.\nYou have ${(budget - amount) / dayLeft} per day left.`
            }]
        } else {
            answer = [{
                type: 'text',
                text: `You have used ${amount} with ${categ}.`
            }]

        }

    
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: answer
        })
        

    } catch (e) {
        console.error(`Error is ${e}`)
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: 'Naur! Something went wrong.'
            }]
        })

    }

}


// okay
async function handleLog(event) { // Category: Meal \nPeople: You, Pop\nAmount: 
    try {
        const cmds = event.message.text.replace(" ", "").split('\n') 
        const categ = formatStr(cmds[0].split(":")[1])
        let amounts; let ids;
        if (cmds.length === 3) {
            amounts = cmds[2].split(":")[1].split(",")
            ids = cmds[1].split(":")[1].split(",")
        } else {
            ids = ['You']
            amounts  = cmds[1].split(':')[1].split(",")
        }
        
        
        if (amounts.length !== ids.length) {
            amounts = Array(ids.length).fill(Number(amounts[0]) / Number(ids.length))
        }
        const date = new Date() // gs will reconstruct this

        var message = ''
        for (let i = 0; i < ids.length; i++) {
            const req = {
                type: 'log',
                id:  ids[i] === 'You' ? (await client.getProfile(event.source.userId)).displayName : ids[i],
                categ: categ,
                amount: amounts[i],
                date: date
            }

            const data = (await axios.post(
                SCRIPT_URL,
                qs.stringify(req),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

            )).data

            
            message = `${message}${ids[i]}: ${data.amount}`

            console.log(req) // TODO: rm
        }

        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: `Logged successfully!\n${message}`
            }]
        })
        
 
    } catch (e) {
        console.error(`Error is ${e}`)
        return client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
                type: 'text',
                text: 'Naur! Something went wrong.'
            }]
        })

    }
}

// passed
async function handleFollow(event) {
    return client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
            type: 'text',
            text: `Hi! I've been assigned as your family's personal expense tracker.
            Please refer to the guide below for what I can do. 
            You can see this guide again when you type 'Help' or use the wrong commands.
            1. Log for yourself
            2. Log for multiple people 
            3. Log for your family as a whole
            4. Check your summary by category
            5. Check your entire summary
            
            Note: DO NOT use commas for amounts (ex: 1000 is correct, not 1,000)
            `
        }]
        
    })
}

function formatStr(str)  { // meal -> categ: Meal
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}



module.exports = router;

