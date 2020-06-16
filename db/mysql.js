const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');
const connection = mysql.createConnection(MYSQL_CONF);
connection.connect();

function exec(sqlc, sqle) {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(function(err) {
            connection.query(sqlc, function(err, result1) {
                if (err) {
                    reject(err)
                    connection.rollback(function() { if (err) { return next(err); } });
                }
                connection.query(sqle, function(err, result2) {
                    if (err) {
                        reject(err)
                        connection.rollback(function() { if (err) { return next(err); } });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            reject(err)
                            connection.rollback(function() { if (err) { return next(err); } });
                        }
                        resolve([result1, result2])
                    });
                });
            });
        })
    })

}

module.exports = {
    exec,
    espace:mysql.escape
}