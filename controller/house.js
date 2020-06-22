const { exec } = require('../db/mysql');
const mysql = require('mysql')
const { getTime } = require('../tool/index');
const multer = require("multer");
const fs = require('fs');
const gethouselist = (params, pageSize, pageNum) => {
    let sqlc = `select * from houselist where 1=1 `;
    let sqle = `select * from houselist_e where 1=1 `;
    let sqlc1 = `select count(*) as total from houselist where 1=1 `
    let sqle1 = `select count(*) as total from houselist_e where 1=1 `
    if (params) {
        let ParamsSearch = JSON.parse(params);
        for (const key in ParamsSearch) {
            if (ParamsSearch[key] != '' && ParamsSearch[key] != '-') {
                if (key == 'city') {
                    sqlc += `and ${key} like '%${ParamsSearch[key]}%' `
                    sqle += `and ${key} like '%${ParamsSearch[key]}%' `
                    sqlc1 += `and ${key} like '%${ParamsSearch[key]}%' `
                    sqle1 += `and ${key} like '%${ParamsSearch[key]}%' `
                } else if (key == 'price') {
                    if (ParamsSearch[key].max) {
                        sqlc += `and sellingprice between ${ParamsSearch[key].min} and ${ParamsSearch[key].max} `
                        sqle += `and sellingprice between ${ParamsSearch[key].min} and ${ParamsSearch[key].max} `
                        sqlc1 += `and sellingprice between ${ParamsSearch[key].min} and ${ParamsSearch[key].max} `
                        sqle1 += `and sellingprice between ${ParamsSearch[key].min} and ${ParamsSearch[key].max} `
                    } else {
                        sqlc += `and sellingprice>${ParamsSearch[key].min} `
                        sqle += `and sellingprice>${ParamsSearch[key].min} `
                        sqlc1 += `and sellingprice>${ParamsSearch[key].min} `
                        sqle1 += `and sellingprice>${ParamsSearch[key].min} `
                    }
                } else {
                    sqlc += `and ${key}='${ParamsSearch[key]}' `
                    sqle += `and ${key}='${ParamsSearch[key]}' `
                    sqlc1 += `and ${key}='${ParamsSearch[key]}' `
                    sqle1 += `and ${key}='${ParamsSearch[key]}' `
                }
            }
        }
    }
    sqlc += `order by id desc `
    sqle += `order by id desc `
    if (pageNum && pageSize) {
        sqlc += `limit ${(pageNum-1)*pageSize} , ${pageSize}`
        sqle += `limit ${(pageNum-1)*pageSize} , ${pageSize}`
    }
    let d = exec(sqlc, sqle);
    let t = exec(sqlc1, sqle1);
    return Promise.all([d, t])
}
const gethousedetail = (id) => {
    let sqlc = `select * from houselist where id=${id}`;
    let sqle = `select * from houselist_e where id=${id}`;
    return exec(sqlc, sqle);
}
const addhouse = (req, res) => {
    let time = getTime()
    let timeId = new Date().getTime()
    let sqlc, sqle
    var id, username, telphone, email, title, city, size, type, tower, layout, faceto, balcony,
        parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction
    const uploadDir = `./public/images/houselist`;
    fs.mkdirSync(uploadDir, { recursive: true })
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function(req, file, cb) {
            cb(null, time + "-" + file.originalname);
        },
    });
    const upload = multer({ storage: storage, }).array("images");

    const imgArrPath = new Promise((resolve, reject) => {
        upload(req, res, function(err) {
            id = req.body.id;
            username = req.body.username
            telphone = Number(req.body.telphone)
            email = req.body.email
            title = req.body.title
            city = req.body.city
            cityname = req.body.cityname
            size = req.body.size
            type = req.body.type
            tower = req.body.tower
            layout = Number(req.body.layout)
            faceto = Number(req.body.faceto)
            balcony = Number(req.body.balcony)
            parking = Number(req.body.parking)
            sellingprice = req.body.sellingprice
            payment = Number(req.body.payment)
            notes = req.body.notes
            furniture = req.body.furniture
            used = Number(req.body.used)
            surrounding = req.body.surrounding
            imgArr = req.body.imgArr
            introduction = req.body.introduction
            if (err) {
                console.error("1.[System] " + err.message);
            } else {
                var imgPath = [];
                req.files.forEach(function(i) {
                    imgPath.push(`public/images/houselist/${i.filename}`);
                });
                resolve(imgPath)
            }
        })
    })
    return imgArrPath.then((result) => {
        let imgArr = JSON.stringify(result);
        if (!id) {
            sqlc = `insert into houselist (id,username,telphone,email,title, city, cityname ,size,createtime, type, tower, layout, faceto, balcony,
                parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction ,status,isnew) values(
                '${timeId}','${username}','${telphone}','${email}',${mysql.escape(JSON.parse(title).name_c)}, '${city}', '${JSON.parse(cityname).cityname_c}' ,'${size}' ,'${time}', '${type}', '${tower}', '${layout}', 
                '${faceto}', '${balcony}','${parking}', '${sellingprice}', '${payment}', ${mysql.escape(JSON.parse(notes).notes_c)}, '${furniture}', '${used}', '${surrounding}', 
                '${imgArr}',${mysql.escape(JSON.parse(introduction).introduction_c)},'0','1')`;

            sqle = `insert into houselist_e (id,username,telphone,email,title, city, cityname ,size,createtime, type, tower, layout, faceto, balcony,
                parking, sellingprice, payment, notes, furniture, used, surrounding, imgArr, introduction ,status,isnew) values(
                '${timeId}','${username}','${telphone}','${email}','${JSON.parse(title).name_e}', '${city}', '${JSON.parse(cityname).cityname_e}', '${size}' ,'${time}', '${type}', '${tower}', '${layout}', 
                '${faceto}', '${balcony}','${parking}', '${sellingprice}', '${payment}', ${mysql.escape(JSON.parse(notes).notes_e)}, '${furniture}', '${used}', '${surrounding}', 
                '${imgArr}',${mysql.escape(JSON.parse(introduction).introduction_e)},'0','1')`;
        } else {
            sqlc = `update houselist set username='${username}',telphone='${telphone}',email='${email}',title=${mysql.escape(JSON.parse(title).name_c)},city='${city}', cityname='${JSON.parse(cityname).cityname_c}',
                size='${size}',createtime='${time}',tower='${tower}',layout='${layout}',faceto='${faceto}',balcony='${balcony}',parking='${parking}',
                sellingprice='${sellingprice}',payment='${payment}',notes=${mysql.escape(JSON.parse(notes).notes_c)},furniture='${furniture}',used='${used}',surrounding='${surrounding}',
                introduction=${mysql.escape(JSON.parse(introduction).introduction_c)} `
            sqle = `update houselist_e set username='${username}',telphone='${telphone}',email='${email}',title='${JSON.parse(title).name_e}',city='${city}',cityname='${JSON.parse(cityname).cityname_e}',
                size='${size}',createtime='${time}',tower='${tower}',layout='${layout}',faceto='${faceto}',balcony='${balcony}',parking='${parking}',
                sellingprice='${sellingprice}',payment='${payment}',notes=${mysql.escape(JSON.parse(notes).notes_e)},furniture='${furniture}',used='${used}',surrounding='${surrounding}',
                introduction=${mysql.escape(JSON.parse(introduction).introduction_e)} `
            if (imgArr !== '[]') {
                sqlc += `,imgArr='${imgArr}' `
                sqle += `,imgArr='${imgArr}' `
            }
            sqlc += `where id=${id}`
            sqle += `where id=${id}`
        }
        return exec(sqlc, sqle)
    })

}
const updatehouse = (id, status, type , isnew) => {
    let sqlc, sqle;
    if (status == 0 || status) {
        sqlc = `update houselist set status='${status}' where id='${id}'`;
        sqle = `update houselist_e set status='${status}' where id='${id}'`;
    }
    if (type) {
        sqlc = `update houselist set type='${type}' where id='${id}'`;
        sqle = `update houselist_e set type='${type}' where id='${id}'`;
    }
    if (isnew == 0 || isnew) {
        sqlc = `update houselist set isnew='${isnew}' where id='${id}'`;
        sqle = `update houselist_e set isnew='${isnew}' where id='${id}'`;
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
    deletehouse,
}