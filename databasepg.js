const {Client} = require('pg');
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 54321,
    database: "HighFiveMe"
});

client.connect()
.then(() => console.log("Connected to Postgres"))
.then(() => client.query("SELECT * FROM post"))
.then(res => console.table(res.rows))
.catch(e => console.log(e))
.finally(() => client.end());
