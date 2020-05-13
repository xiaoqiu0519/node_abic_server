const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');
const connection = mysql.createConnection(MYSQL_CONF);
connection.connect();

function exec(sqlc, sqle) {
    // let sqlcfun = new Promise((resolve, reject) => {
    //     connection.query(sqlc, (err, result) => {
    //         if (err) {
    //             reject(err);
    //             return
    //         }
    //         resolve(result)
    //     })
    // });
    // let sqlefun = new Promise((resolve, reject) => {
    //     connection.query(sqle, (err, result) => {
    //         if (err) {
    //             reject(err);
    //             return
    //         }
    //         resolve(result)
    //     })
    // });
    // return Promise.all([sqlcfun, sqlefun])
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
    exec
}