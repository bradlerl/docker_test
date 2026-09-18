const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(__dirname));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const config = {
    user: 'Bradrachel',
    password: 'Rach#0605',
    database: 'virtual_escape_room',
    options: { trustServerCertificate: true}
};

app.get('/api/data', async (req, res) => {
    try {
        console.log("Connecting to SQL Server...")
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Rivals`;
        res.json(result.recordset);
    } catch (err) {
        console.error("SQL ERROR:", err);
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
