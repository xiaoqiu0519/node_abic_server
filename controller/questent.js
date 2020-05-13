const { exec } = require('../db/mysql');
const { getTime } = require('../tool/index');
const getquestent = (pageSize, pageNum) => {
    let sqlc = `select * from questentlist where status=1 order by createtime desc `;
    let sqle = `select * from questentlist_e where status=1 order by createtime desc `;
    let sqlc1 = `select count(*) as total from questentlist `
    let sqle1 = `select count(*) as total from questentlist_e `
    if (pageNum && pageSize) {
        sqlc += `limit ${(pageNum-1)*pageSize} , ${pageSize}`
        sqle += `limit ${(pageNum-1)*pageSize} , ${pageSize}`
    }
    let d = exec(sqlc, sqle);
    let t = exec(sqlc1, sqle1);
    return Promise.all([d, t])
}
const addquestent = (id, questent_c, answer_c, questent_e, answer_e) => {
    let sqlc, sqle;
    let time = getTime()
    if (id) {
        sqlc = `update questentlist set questent='${questent_c}',answer='${answer_c}' where id='${id}'`
        sqle = `update questentlist_e set questent='${questent_e}',answer='${answer_e}' where id='${id}'`
    } else {
        sqlc = `insert into questentlist (questent,answer,status,createtime) values( '${questent_c}' , '${answer_c}'  , '1' , '${time}')`;
        sqle = `insert into questentlist_e (questent,answer,status,createtime) values( '${questent_e}' , '${answer_e}' , '1' ,'${time}')`;
    }
    return exec(sqlc, sqle)
}
const deletequestent = (id) => {
    let sqlc = `delete from questentlist where id='${id}'`;
    let sqle = `delete from questentlist_e where id='${id}'`;
    return exec(sqlc, sqle);
}
module.exports = {
    getquestent,
    addquestent,
    deletequestent
}