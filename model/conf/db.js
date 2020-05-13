const env = process.env.NODE_ENV;

let MYSQL_CONF

if (env == 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'abic_house'
    }
}
if (env == 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Abic@2020',
        port: '3306',
        database: 'abic_house'
    }
}

module.exports = {
    MYSQL_CONF
}