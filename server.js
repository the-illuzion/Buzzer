'use strict';

const request = require('request');
var express = require('express');
var app = express();
var https = require('https');
// const https = require('https');
const fs = require('fs');
var xml2js = require('xml2js');
const nodemailer = require('nodemailer');
var cors = require('cors');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var dbConfig = require("./db_sequlize");
// const io = require('socket.io')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const options = {
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cert.pem')
};

const httpserver = https.createServer(options, app);
var io = require('socket.io')(httpserver);


// app.post('/sendotp', function (req, res, next) {
//     console.log(req.body.mobileno)
//     var mobileno = req.body.mobileno
//     var digits = '0123456789';
//     let OTP = '';
//     for (let i = 0; i < 6; i++) {
//         OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     var SMS = 'OTP for logging the event is OTP:- ' + OTP
//     var options = {
//         'method': 'GET',
//         'url': 'http://sms.smsmenow.in/sendsms.jsp?user=rayqube&password=79ff68e0ccXX&senderid=EVENTS&mobiles=' + mobileno + '&sms=' + SMS,
//         'headers': {
//         }
//     };
//     //   console.log(options)
//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         // console.log(response.body.code);
//         var parser = new xml2js.Parser();
//         parser.parseString(response.body, function (err, result) {
//             console.log(result.smslist.sms[0].code);
//             if (result.smslist.sms[0].code[0] == "000") {
//                 console.log("success")
//                 console.log(req.body)
//                 var sqlQuery = "SELECT * FROM [checkotp] where mobileno = '" + mobileno + "'"
//                 console.log(sqlQuery)
//                 dbConfig.sequelize.query(sqlQuery, { type: dbConfig.sequelize.QueryTypes.SELECT })
//                     .then(function (data) {
//                         console.log(data)
//                         // io.emit('questionasked', req.body);
//                         if (data.length == 0) {
//                             var timestamp = new Date().toISOString("en-US", { timeZone: "Asia/Kolkata" })
//                             var sqlQuery = "insert into [checkotp] values ( '" + mobileno + "' , '" + OTP + "')"
//                             console.log(sqlQuery)
//                             dbConfig.sequelize.query(sqlQuery, { type: dbConfig.sequelize.QueryTypes.INSERT })
//                                 .then(function (data) {
//                                     res.json({ "status": "success" })
//                                 })
//                             // res.json({ "status": "failed" })

//                         } else {
//                             var timestamp = new Date().toISOString("en-US", { timeZone: "Asia/Kolkata" })
//                             var sqlQuery = "update [checkotp] set OTP = " + OTP + " where mobileno = " + mobileno
//                             console.log(sqlQuery)
//                             dbConfig.sequelize.query(sqlQuery, { type: dbConfig.sequelize.QueryTypes.UPDATE })
//                                 .then(function (data) {
//                                     res.json({ "status": "success" })
//                                 })
//                         }
//                     })
//             } else {
//                 console.log("failed")
//                 res.json({ "status": "failed", "data": result.smslist.sms[0].reason[0] })
//             }
//         });
//     });
// });



app.post('/verify', function (req, res, next) {
    console.log(req.body.name)
    var name = req.body.name
    var zid = req.body.zid
    console.log("success")
    console.log(req.body)
    var sqlQuery = "SELECT * FROM [nissan] where name = '" + name + "' and zid = '" +zid+ "'"
    console.log(sqlQuery)
    dbConfig.sequelize.query(sqlQuery, { type: dbConfig.sequelize.QueryTypes.SELECT })
        .then(function (data) {
            console.log(data)
            // io.emit('questionasked', req.body);
            if (data.length == 0) {
                res.json({ "status": "failed" })
            } else {
                var timestamp = new Date().toISOString("en-US", {timeZone: "Asia/Kolkata"})
                var sqlQuery = "insert into [nissanLogin] values ( '" + name + "' , '" + timestamp + "')"
                console.log(sqlQuery)
                dbConfig.sequelize.query(sqlQuery, { type: dbConfig.sequelize.QueryTypes.INSERT })
                    .then(function (data) {
                        res.json({ "status": "success"})
                    })
            }
        });
});


httpserver.listen(3000, () => {
    console.log('listening on *:3000');
});