import mariadb from "mariadb"

var pool = mariadb.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Hashuye",
    database: "propertymanagement"
});


export default pool;