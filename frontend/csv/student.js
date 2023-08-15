function csvToJSON(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines.shift().split(",");
    const jsonArray = [];

    lines.forEach((line) => {
        const values = line.split(",");
        const obj = {};

        headers.forEach((header, index) => {
            const value = values[index].trim();
            if (header === "DateOfBirth" || header === "DateOfAdmission") {
                // Convert date strings to Date objects
                obj[header.trim()] = new Date(value);
            } else {
                obj[header.trim()] = value;
            }
        });

        jsonArray.push(obj);
    });

    return jsonArray;
}

const express = require('express');
const csvtojson = require('csvtojson');
const app = express();

app.use(express.json());

app.post('/api/v1/students/csv', (req, res) => {
    if (!req.body.csv) {
        return res.status(400).json({ error: 'CSV data is missing in the request body.' });
    }

    const csvData = req.body.csv;

    csvtojson()
        .fromString(csvData)
        .then((jsonArray) => {
            // Optionally, you can process the jsonArray here if needed
            res.json(jsonArray);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error parsing CSV data.' });
        });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



