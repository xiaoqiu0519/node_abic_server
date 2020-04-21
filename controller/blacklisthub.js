const { exec } = require('../db/mysql');
const { getTime } = require('../tool/index');
const getblacklist = (status) => {
    let sqlc = `select * from blacklist where 1=1 `;
    let sqle = `select * from blacklist_e where 1=1 `;
    if (status != 0 && status) {
        sqlc += `and status='${status}' `;
        sqle += `and status='${status}' `;
    }
    sqlc += `order by createtime desc`;
    sqle += `order by createtime desc`;
    return exec(sqlc, sqle);
};
// 一下为新增吐槽小站接口  已与更新接口合并
// const addblack = (title, content, telphone) => {
//     let time = getTime();
//     let sql = `insert into blacklist (title,content,createtime,telphone,status) 
//                 values('${title}','${content}',${time},'${telphone}',0)`;
//     return exec(sql);
// }
const udatestatus = (id, status) => {
    let sqlc = `update blacklist set status='${status}' where id='${id}'`;
    let sqle = `update blacklist_e set status='${status}' where id='${id}'`;
    return exec(sqlc, sqle)
};
const updatecon = (id, title_c, content_c, title_e, content_e, telphone) => {
    console.log(title_c + ',' + title_e + ',' + content_e + ',' + telphone)
    let time = getTime()
    let sqlc, sqle
    if (id) {
        sqlc = `update blacklist set title='${title_c}',content='${content_c}',
            createtime='${time}' where id='${id}'`;
        sqle = `update blacklist_e set title='${title_e}',content='${content_e}',
            createtime='${time}' where id='${id}'`;
    } else {
        sqlc = `insert into blacklist (title,content,createtime,telphone,status) 
                values('${title_c}','${content_c}','${time}','${telphone}',0)`;
        sqle = `insert into blacklist_e (title,content,createtime,telphone,status) 
                values('${title_e}','${content_e}','${time}','${telphone}',0)`;
    }

    return exec(sqlc, sqle);
};
const deleteblack = (id) => {
    let sqlc = `delete from blacklist where id='${id}'`;
    let sqle = `delete from blacklist_e where id='${id}'`;
    return exec(sqlc, sqle);
};

module.exports = {
    getblacklist,
    udatestatus,
    updatecon,
    deleteblack
};