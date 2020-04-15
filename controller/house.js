const { exec } = require('../db/mysql');
const { getTime } = require('../tool/index');
const gethouselist = (params) => {
    let sqlc = `select * from houselist where 1=1 `;
    let sqle = `select * from houselist_e where 1=1 `;
    if (params) {
        let ParamsSearch = JSON.parse(params);
        for (const key in ParamsSearch) {
            if (ParamsSearch[key] != '' && ParamsSearch[key] != '-') {
                if (key == 'city') {
                    sqlc += `and ${key} like '%${ParamsSearch[key]}%' `
                    sqle += `and ${key} like '%${ParamsSearch[key]}%' `
                } else {
                    sqlc += `and ${key}='${ParamsSearch[key]}' `
                    sqle += `and ${key}='${ParamsSearch[key]}' `
                }
            }
        }
    }
    // sqlc += 'and' + sqlc + 'limit 0,5'
    // sqle += 'and' + sqle + 'limit 0,5'
    console.log(sqlc)
    return exec(sqlc, sqle);
}
const gethousedetail = (id) => {
    let sqlc = `select * from houselist where id='${id}'`;
    let sqle = `select * from houselist_e where id='${id}'`;
    return exec(sqlc, sqle);
}
const addhouse = (id, username, telphone, email, title, city, size, type, tower, layout, faceto, balcony,
    parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction) => {
    let time = getTime()
    console.log(city)
    let sqlc, sqle
    if (!id) {
        sqlc = `insert into houselist (username,telphone,email,title, city, size,createtime, type, tower, layout, faceto, balcony,
            parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction ,status) values(
            '${username}','${telphone}','${email}','${JSON.parse(title).name_c}', '${city}', ${size} ,'${time}', '${type}', '${tower}', '${layout}', 
            '${faceto}', '${balcony}','${parking}', '${sellingprice}', '${payment}', '${JSON.parse(notes).notes_c}', '${furniture}', '${used}', '${surrounding}', 
            '${imgArr}','${JSON.parse(introduction).introduction_c}','0')`;

        sqle = `insert into houselist_e (username,telphone,email,title, city, size,createtime, type, tower, layout, faceto, balcony,
            parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction ,status) values(
            '${username}','${telphone}','${email}','${JSON.parse(title).name_e}', '${city}', ${size} ,'${time}', '${type}', '${tower}', '${layout}', 
            '${faceto}', '${balcony}','${parking}', '${sellingprice}', '${payment}', '${JSON.parse(notes).notes_e}', '${furniture}', '${used}', '${surrounding}', 
            '${imgArr}','${JSON.parse(introduction).introduction_e}','0')`;
    } else {
        sqlc = `update houselist set username='${username}',telphone='${telphone}',email='${email}',title='${JSON.parse(title).name_c}',city='${city}',
            size='${size}',createtime='${time}',type='${type}',tower='${tower}',layout='${layout}',faceto='${faceto}',balcony='${balcony}',parking='${parking}',
            sellingprice='${sellingprice}',payment='${payment}',notes='${JSON.parse(notes).notes_c}',furniture='${furniture}',surrounding='${surrounding}',
            imgArr='${imgArr}',introduction='${JSON.parse(introduction).introduction_c}' where id='${id}'`
        sqle = `update houselist_e set username='${username}',telphone='${telphone}',email='${email}',title='${JSON.parse(title).name_e}',city='${city}',
            size='${size}',createtime='${time}',type='${type}',tower='${tower}',layout='${layout}',faceto='${faceto}',balcony='${balcony}',parking='${parking}',
            sellingprice='${sellingprice}',payment='${payment}',notes='${JSON.parse(notes).notes_e}',furniture='${furniture}',surrounding='${surrounding}',
            imgArr='${imgArr}',introduction='${JSON.parse(introduction).introduction_e}' where id='${id}'`
    }
    return exec(sqlc, sqle)
}
const updatehouse = (id, status, type) => {
    let sqlc, sqle;
    if (status == 0 || status) {
        sqlc = `update houselist set status='${status}' where id='${id}'`;
        sqle = `update houselist_e set status='${status}' where id='${id}'`;
    }
    if (type) {
        sqlc = `update houselist set type='${type}' where id='${id}'`;
        sqle = `update houselist_e set type='${type}' where id='${id}'`;
    }
    return exec(sqlc, sqle)
}
const deletehouse = (id) => {
    let sqlc = `delete from houselist where id='${id}'`;
    let sqle = `delete from houselist_e where id='${id}'`;
    return exec(sqlc, sqle);
};
module.exports = {
    gethouselist,
    addhouse,
    gethousedetail,
    updatehouse,
    deletehouse
}