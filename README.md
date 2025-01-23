# expense-tracker-line-bot-sheets
This LINE bot communicates with a Google spreadsheet to mainly
1. Log personal expense by category
2. Log group expense by category
3. Report monthly expenses (by category or total)
<div>
<img width='200' src='https://github.com/user-attachments/assets/fb29bc22-df08-49d7-a9a6-1caf1fed8ccc'/>
<img width='200' src='https://github.com/user-attachments/assets/209181a5-5fa0-45c0-af1c-2b07bd4c5b4e'/>
<img width="500" src="https://github.com/user-attachments/assets/f16aaae2-438b-473a-9264-a73688002e81"/>
</div>



# Prerequisites
1. Line bot [setup](https://developers.line.biz/en/docs/messaging-api/building-bot/)
2. Vercel
3. Google spreadsheet with Apps Script 

In the local development and on Vercel, the environmental variables should look like this:
```bash
CHANNEL_SECRET=<from LINE>
CHANNEL_TOKEN=<from LINE>
SCRIPT=<Apps Script endpoint>
```

# Flow
1. Create richmenus in ```richmenu.js```
2. Copy and paste code from ```sheets.js``` to the spreadsheet's Apps Script
3. Deploy the project to Vercel
4. Add the Vercel endpoint to LINE Webhook URL
