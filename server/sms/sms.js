const express = require('express');
const router = express.Router();
const db = require('../_helpers/db.config');

require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);
/**
 * getTexts
 * Retrieve texts from MongoDB
 * GET
 */
router.get('/getTexts', (req, res) => {
    db.query(`SELECT * FROM texts;`, (err, results) => {
        res.json(results.rows)
    });
});

/**
 * getTexts:id
 * Retrieve specific texts from MongoDB
 * GET
 */
router.get('/getTexts:id', (req, res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM texts where id = ${id};`, (err, results) => {
        res.json(results.rows[0])
    });
});

/**
 * sendTexts
 * Send texts from Twilio number with message
 * POST
 */
router.post('/sendText', (req, res) => {
    client.conversations.conversations.create({friendlyName: 'Insurance'})
    .then(client.conversations.conversations('CH030c8edf9dd147a48100c23616798b3e')
    .participants
    .create({
       identity: 'Cody',
       'messagingBinding.projectedAddress': sendingNumber
     }))
    .then(participant => console.log(participant.sid))
    .then(client.conversations.conversations('CH030c8edf9dd147a48100c23616798b3e')
    .participants
    .create({'messagingBinding.address': req.body.phone})
    .then(participant => console.log(participant.sid)))
    .then(client.conversations.conversations('CH030c8edf9dd147a48100c23616798b3e')
    .participants
    .create({'messagingBinding.address': req.body.phone})
    .then(participant => console.log(participant.sid)))
    .then(client.conversations.conversations('CH030c8edf9dd147a48100c23616798b3e')
    .messages
    .create({
        body: req.body.message,
        author: 'Cody'
     })
    .then(message => console.log(message.sid)))
    .then(function () {
        try {
            const texts = db.query(
                `insert into texts
                (
                    "isSent",
                    "isReceived",
                    "name",
                    "phoneNumber",
                    message,
                    "createdAt",
                    "updatedAt"
                )
                values
                (
                    true,
                    false,
                    '${req.body.firstname}${' '}${req.body.lastname}',
                    '${req.body.phone}',
                    '${req.body.message}',
                    'now()',
                    'now()'
                )
                `)
                res.json(texts.rows);
                res.status(201).json({message: "new image uploaded"});
            } catch (error) {
              res.status(409).json({
                message: error.message,
              });
            }
        }
    );
})

    //client.messages
    //    .create({
    //        
    //        from: sendingNumber,
    //        to: req.body.phone
    //    })
    //    .then(function () {
    //        message => console.log(message.sid);
    //    })
    //    .then(function () {
    //        let text = new Text(req.body);
    //        text.save()
    //            .then(text => {
    //                res.status(200).json({ 'text': 'text added successfully after send' });
    //            })
    //            .catch(err => {
    //                res.status(400).send('adding new text after sending failed');
    //            });
    //    })
    //    .catch(err => {
    //        res.status(400).send('unable to send text through twilio');
    //    });


/**
 * storeTexts
 * Store texts received from webhook to MongoDB server
 * POST
 */
router.post('/storeTexts', (req, res) => {
    // console.log(JSON.stringify(req.body));
    // console.log(JSON.parse(JSON.stringify(req.body)).Body);
    const data = JSON.parse(JSON.stringify(req.body));
    const incomingText = {
        isSent: false,
        isReceived: true,
        name: data.FromCity,
        phone: data.From,
        message: data.Body,
        createdat: '2021-06-15 05:44:05',
        updatedat: '2021-06-15 05:44:05'
    };
    let text = new Text(incomingText);
    text.save()
        .then(text => {
            res.status(200).json({ 'text': 'text added successfully after receiving' });
        })
        .catch(err => {
            res.status(400).send('adding newly received text failed');
        });
});


module.exports = router;