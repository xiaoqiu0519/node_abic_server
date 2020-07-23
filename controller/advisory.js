const { exec } = require('../db/mysql');
const { getTime } = require('../tool/index');
const mysql = require('mysql')
/* 获取资讯列表*/
const getadvisory = (params, pageSize, pageNum) =>{
  let sqlc = `select * from advisory_c where 1=1 `;
  let sqle = `select * from advisory_e where 1=1 `;
  let sqlc1 = `select count(*) as total from advisory_c where 1=1 `
  let sqle1 = `select count(*) as total from advisory_e where 1=1 `
  if (params) {
    let ParamsSearch = JSON.parse(params);
    for (const key in ParamsSearch) {
        if (ParamsSearch[key] != '' && ParamsSearch[key] != '-') {
          sqlc += `and ${key}='${ParamsSearch[key]}' `
          sqle += `and ${key}='${ParamsSearch[key]}' `
          sqlc1 += `and ${key}='${ParamsSearch[key]}' `
          sqle1 += `and ${key}='${ParamsSearch[key]}' `
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
const advisorydetail = (id)=>{
  let sqlc = `select * from advisory_c where id=${id}`;
  let sqle = `select * from advisory_e where id=${id}`;
  return exec(sqlc, sqle);
}
const updatestatus = (id,status)=>{
  let sqlc = `update advisory_c set status='${status}' where id='${id}'`;
  let sqle = `update advisory_e set status='${status}' where id='${id}'`;
  return exec(sqlc, sqle)
}
const deleteadvisory = (id)=>{
  let sqlc = `delete from advisory_c where id='${id}'`;
  let sqle = `delete from advisory_e where id='${id}'`;
  return exec(sqlc, sqle);
}
/* 添加资讯*/
const addadvisory = (fieldsArr,title,type) =>{
  let content_c = []
  let content_e = []
  fieldsArr.map((ele)=>{
    if(ele.type == 1){
      content_c.push({
        num:ele.num,
        type:ele.type,
        content:ele.con_c
      })
      content_e.push({
        num:ele.num,
        type:ele.type,
        content:ele.con_e
      })
    }else{
      content_c.push({
        num:ele.num,
        type:ele.type,
        img:ele.img
      })
      content_e.push({
        num:ele.num,
        type:ele.type,
        img:ele.img
      })
    }
  })
  let timeId = new Date().getTime()
  let time = getTime()
  let sqlc = `insert into advisory_c (id,title,content,createtime,status,type) 
    values('${timeId}',${mysql.escape(JSON.parse(title).title_c)},${mysql.escape(JSON.stringify(content_c))},'${time}',0,'${type}')`
  let sqle = `insert into advisory_e (id,title,content,createtime,status,type) 
    values('${timeId}',${mysql.escape(JSON.parse(title).title_e)},${mysql.escape(JSON.stringify(content_e))},'${time}',0,'${type}')`
  return exec(sqlc, sqle)
}
module.exports = {
  getadvisory,
  addadvisory,
  updatestatus,
  advisorydetail,
  deleteadvisory
}