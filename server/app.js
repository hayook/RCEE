const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { writeFileSync } = require('fs');
const { exec } = require('child_process');
const languages = require('./data.js'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({languages}));

app.post('/', (req, res) => {
    const { userLanguage } = req.body;

    writeFileSync(path.resolve('temp', userLanguage.fileName), userLanguage.userCode);

    exec(`${userLanguage.compiler} ${userLanguage.fileName}`, { cwd: path.resolve('temp') }, (err, stdout, stderr) => {

        if (stderr) {
            console.log('Compilation Error : ' + stderr);
            res.status(500).json({ output: stderr });
            return;
        }

        if (err) {
            console.log('Command Error : ' + err);
            res.sendStatus(500);
            return;
        }


        if (userLanguage.interpeted) {
            res.json({ output: stdout });
            return; 
        }

        exec('a.exe', { cwd: path.resolve('temp') }, (err, stdout, stderr) => {
            if (stderr) {
                console.log('Program Error : ' + stderr);
                res.status(500).json({ output: stderr });
                return;
            }

            if (err) {
                console.log('Command Error : ' + err);
                res.sendStatus(500);
                return;
            }

            res.json({ output: stdout });

        })
    });
});

app.listen(5000, () => console.log('Server Started On Port %000'));  