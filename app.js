const express = require('express');
const Mailjet = require('node-mailjet');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/send', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body)

    const mailjet = Mailjet.apiConnect(
        "*",
        "*",
    );
    
    const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: "contact@maison-des-experts-immobiliers.fr",
                    Name: "Mailjet Pilot"
                  },
                  To: [
                    {
                      Email: "contact@wiwaks.com",
                      Name: "passenger 1"
                    }
                  ],
                  Subject: "Your email flight plan!",
                  TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                  HTMLPart: req.body.body
                }
              ]
            })
    
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;