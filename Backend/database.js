import mariadb from "mariadb"
import dotenv from "dotenv"
dotenv.config();

var pool = mariadb.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


export default pool;