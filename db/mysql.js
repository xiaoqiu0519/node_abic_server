const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');
const con = mysql.createConnection(MYSQL_CONF);
con.connect();

function exec(sqlc, sqle) {
    let sqlcfun = new Promise((resolve, reject) => {
        con.query(sqlc, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result)
        })
    });
    let sqlefun = new Promise((resolve, reject) => {
        con.query(sqle, (err, result) => {
            if (err) {
                reject(err);
                return
            }
            resolve(result)
        })
    });
    return Promise.all([sqlcfun, sqlefun])

}

module.exports = {
    exec
}