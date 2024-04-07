// app.js

const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Serve static files from the public directory
app.use(express.static('public'));

// Handle POST request for file upload
app.post('/upload', upload.single('csvFile'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Read the uploaded CSV file
    const filePath = path.join(__dirname, file.path);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Process the CSV data here
            // For demonstration, let's send back the parsed data
            res.status(200).json(results);

            // Delete the uploaded file
            fs.unlinkSync(filePath);
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
