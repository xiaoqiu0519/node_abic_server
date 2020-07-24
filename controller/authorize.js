const { exec } = require('../db/mysql');
/**获取在线授权列表 */

const getauthorize = (status) => {
    let sql = `select * from authorize where 1=1 `
    if (status) {
        sql += `and status='${status}'`
    }
    return exec(sql)
};
/**修改在线授权的状态 */

const updateauthorize = (id, status) => {
    let sql = `update authorize set status='${status}' where id='${id}'`;
    return exec(sql);
};

/**新增在线授权 */
const addauthorize = (
    username, telphone1, email, title, used, tower, layout, size, faceto,
    balcony, parking, sellingprice, payment, notes, furniture, type
) => {
    let time = new Date().getTime()
    let sql = `insert into authorize (
        id,username,telphone,email,title,used,tower,layout,size,faceto,balcony,
        parking,sellingprice,payment,notes,furniture,createtime,type,status
    ) values(
        '${time}','${username}','${telphone1}','${email}','${title}','${used}','${tower}','${layout}','${size}','${faceto}',
        '${balcony}','${parking}','${sellingprice}','${payment}','${notes}','${furniture}','${time}','${type}','0')`;
    return exec(sql)
};
/**删除在线授权 */
const deletelist = (id) => {
    let sql = `delete from authorize where id='${id}'`;
    return exec(sql);
}

module.exports = {
    addauthorize,
    getauthorize,
    updateauthorize,
    deletelist
}