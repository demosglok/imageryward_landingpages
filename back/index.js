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

app.post('/contact', (req, res) => {
    const request = req.body;
    if(JSON.stringify(request).length < 10000) {
	answers.push(request);
    }
    res.json({success: true});
});

setInterval(() => {
    if(answers.length > 0) {
        console.log('saving answers');
        try {
            const str = answers.map(el => JSON.stringify(el)).join(",\n") + ",\n";
            fs.appendFileSync('data.json',str);
            answers = [];
        }catch(e) {
            console.log('error saving to file', e.message);
        }
    }
}, 2000);
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
