const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(__dirname));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const pool = mysql.createPool({
    host: process.env.mysql.railway.internal,
    user: process.env.root,
    password: process.env.tqTLuPGPAMUmFkVaxxsjIslsAEEiAXvQ,
    database: railway,
    port: process.env.MYSQLPORT
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
        const [rows] = await pool.query('SELECT * FROM Rivals');
        res.json(rows);
    } catch (err) {
        console.error("SQL ERROR:", err);
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
