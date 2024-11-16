const express = require('express');
const formidable = require('formidable');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/remove-background', (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'uploads'); // Temporary upload directory
    form.keepExtensions = true; // Keep file extension for easier processing

    // Ensure the upload directory exists
    fs.mkdirSync(form.uploadDir, { recursive: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error("Error parsing form:", err);
            return res.status(500).send("Error processing upload");
        }

        const inputFile = files.image.path;
        const outputFile = path.join(__dirname, 'output', `${Date.now()}-output.png`);

        // Ensure output directory exists
        fs.mkdirSync(path.join(__dirname, 'output'), { recursive: true });

        // Define the `rembg` command
        const command = `rembg i ${inputFile} ${outputFile}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing rembg: ${error.message}`);
                return res.status(500).send("Error removing background");
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);

            // Send the output image file as a response
            res.download(outputFile, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                }

                // Cleanup: Delete the temporary and output files after sending response
                fs.unlink(inputFile, () => {});
                fs.unlink(outputFile, () => {});
            });
        });
    });
});

app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
