const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

require('dotenv').config();

const port = process.env.PORT || 8081;
console.log('env port', process.env.PORT);


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

let answers = [];
let contactus = [];
let earlyaccess = [];

const MAX_MEMORY_LENGTH = 20;
function getip(req) {
    return req.headers['x-forwarded-for'];
}
app.post('/contact', (req, res) => {
    if(answers.length > MAX_MEMORY_LENGTH) {
	res.json({success: false});
    } else {
	const request = req.body;
	request.ip = getip(req);
	answers.push(request);
	res.json({success: true});
    }
});
app.post('/contactus', (req, res) => {
    if(contactus.length > MAX_MEMORY_LENGTH) {
	res.json({success: false});
    } else {
	const request = req.body;
	request.ip = getip(req);
	contactus.push(request);
	res.json({success: true});
    }
});
app.post('/earlyaccess', (req, res) => {
    if(earlyaccess.length > MAX_MEMORY_LENGTH) {
	res.json({success: false});
    } else {
	const request = req.body;
	request.ip = getip(req);
	earlyaccess.push(request);
	res.json({success: true});
    }
});
setInterval(() => {
    if(answers.length > 0) {
        try {
            const str = answers.map(el => JSON.stringify(el)).join(",\n") + ",\n";
            fs.appendFileSync('old_contact.json',str);
            answers = [];
        }catch(e) {
            console.log('error saving answers to file', e.message);
        }
    }
    if(contactus.length > 0) {
        try {
            const str = contactus.map(el => JSON.stringify(el)).join(",\n") + ",\n";
            fs.appendFileSync('contactus.json',str);
            contactus = [];
        }catch(e) {
            console.log('error saving contactus to file', e.message);
        }
    }
    if(earlyaccess.length > 0) {
        try {
            const str = earlyaccess.map(el => JSON.stringify(el)).join(",\n") + ",\n";
            fs.appendFileSync('earlyaccess.json',str);
            earlyaccess = [];
        }catch(e) {
            console.log('error saving answers to file', e.message);
        }
    }
}, 5000);
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
