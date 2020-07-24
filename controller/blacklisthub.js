const { exec } = require('../db/mysql');
const { getTime } = require('../tool/index');
const mysql = require('mysql')
const multer = require("multer");
const fs = require('fs');
const getblacklist = (status, id, pageSize, pageNum) => {
    let sqlc = `select * from blacklist where 1=1 `;
    let sqle = `select * from blacklist_e where 1=1 `;
    let sqlc1 = `select count(*) as total from blacklist where 1=1 `
    let sqle1 = `select count(*) as total from blacklist_e where 1=1 `
    if (status != 0 && status) {
        sqlc += `and status=${status} `;
        sqle += `and status=${status} `;
        sqlc1 += `and status=${status} `;
        sqle1 += `and status=${status} `;
    }
    if (id) {
        sqlc += `and id=${id} `;
        sqle += `and id=${id} `;
        sqlc1 += `and id=${id} `;
        sqle1 += `and id=${id} `;
    }
    sqlc += `order by createtime desc `;
    sqle += `order by createtime desc `;
    if (pageNum && pageSize) {
        sqlc += ` limit ${(pageNum-1)*pageSize} , ${pageSize}`
        sqle += ` limit ${(pageNum-1)*pageSize} , ${pageSize}`
    }
    let d = exec(sqlc, sqle);
    let t = exec(sqlc1, sqle1);
    return Promise.all([d, t])
};
const udatestatus = (id, status) => {
    let sqlc = `update blacklist set status='${status}' where id='${id}'`;
    let sqle = `update blacklist_e set status='${status}' where id='${id}'`;
    return exec(sqlc, sqle)
};
const updatecon = (req, res) => {
    let time = getTime()
    let timeId = new Date().getTime()
    let sqlc, sqle
    var id, title_c, content_c, title_e, content_e, telphone, imgs
    const uploadDir = `./public/images/blacklisthub`;
    fs.mkdirSync(uploadDir, { recursive: true })
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function(req, file, cb) {
            cb(null, Math.random().toString(36).substr(-10) + time + "-" + file.originalname);
        },
    });
    const upload = multer({ storage: storage, }).array("images");
    const imgArrPath = new Promise((resolve, reject) => {
        upload(req, res, function(err) {
            id = req.body.id;
            title_c = req.body.title_c;
            content_c = req.body.content_c;
            title_e = req.body.title_e;
            content_e = req.body.content_e;
            telphone = req.body.telphone;
            imgs = req.body.imgs
            if (err) {
                console.error("1.[System] " + err.message);
            } else {
                var imgPath = [];
                req.files.forEach(function(i) {
                    imgPath.push(`public/images/blacklisthub/${i.filename}`);
                });
                resolve(imgPath)
            }
        })
    })
    return imgArrPath.then((result) => {
        let imgStr = JSON.stringify(result);
        if (id) {
            sqlc = `update blacklist set title=${mysql.escape(title_c)},content=${mysql.escape(content_c)},
                    createtime='${time}' `;
            sqle = `update blacklist_e set title=${mysql.escape(title_e)},content=${mysql.escape(content_e)},
                    createtime='${time}' `;
            if (imgStr !== '[]') {
                sqlc += `,imgs='${imgStr}' `
                sqle += `,imgs='${imgStr}' `
            }
            sqlc += `where id=${id}`
            sqle += `where id=${id}`
        } else {
            sqlc = `insert into blacklist (id,title,content,createtime,telphone,status,imgs) 
                        values('${timeId}',${mysql.escape(title_c)},${mysql.escape(content_c)},'${time}','${telphone}',0,'${imgStr}')`;
            sqle = `insert into blacklist_e (id,title,content,createtime,telphone,status,imgs) 
                        values('${timeId}',${mysql.escape(title_e)},${mysql.escape(content_e)},'${time}','${telphone}',0,'${imgStr}')`;
        }
        return exec(sqlc, sqle)
    })
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