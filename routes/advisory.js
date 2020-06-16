var express = require('express');
var router = express.Router();
const fs = require('fs')
const { getTime } = require('../tool/index');
var formidable = require('formidable');
const { 
  getadvisory, 
  addadvisory,
  updatestatus,
  deleteadvisory,
  advisorydetail
} = require('../controller/advisory');
const {
  deleteImg
} = require('../tool/index')
router.post('/list', (req, res, next) => {
  const { params, pageSize, pageNum } = req.body;
  getadvisory(params, pageSize, pageNum).then((listdata) => {
      res.json({
          error: '0000',
          data: listdata[0],
          total: listdata[1][0][0].total
      })
  })
});
router.post('/updatestatus',(req,res,next)=>{
  const { id , status} = req.body
  updatestatus(id,status).then(()=>{
    res.json({
      error: '0000',
      data: '操作成功'
    })
  })
});
router.post('/deleteadvisory',(req,res,next)=>{
  const { id } = req.body
  advisorydetail(id).then(data => {
    let Arr = []
    data[0].map((ele)=>{
      JSON.parse(ele.content).map((arg)=>{
        if(arg.type == 2){
          Arr.push(arg.img)
        }
      })
    })
    let imgArr = [{imgArr:JSON.stringify(Arr)}]
    if (imgArr && imgArr.length != 0) {
        deleteImg(imgArr, 'imgArr').then(() => {
          deleteadvisory(id).then(()=>{
            res.json({
              error: '0000',
              data: '操作成功'
            })
          })
        })
    } else {
        res.json({
            error: '0001',
            mes: "操作异常，请稍后再试",
        })
    }
  })
})
router.post('/advisorydetail',(req,res,next)=>{
  const { id } = req.body
  advisorydetail(id).then((result)=>{
    res.json({
      error:'0000',
      data:result
    })
  })
})
router.post('/addadvisory', (req, res, next) => {
  let uploadDir = './public/images/advisory/'
  fs.mkdirSync(uploadDir, { recursive: true })
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = uploadDir;
  form.keepExtensions = true;  
  form.maxFieldsSize = 2000 * 1024 * 1024;
  form.parse(req, function(err, fields, files) {
    let time = getTime()
    let fieldsArr = JSON.parse(fields.content)
    let promistobj = {}
    let promistArr = []
    for (const key in files) {
      promistobj[key] = new Promise((resolve,reject)=>{
        let newpath =  uploadDir + time + '-' + files[key].name;
        let num =  Number(key.replace('images',''))
        fieldsArr[num-1].img = newpath
        fs.rename(files[key].path,newpath,function(err){
          if(err){console.error("改名失败"+err);}
          resolve()
        }); 
      })
      promistArr.push(promistobj[key])
    }
    Promise.all(promistArr).then((result)=>{
      addadvisory(fieldsArr,fields.title).then(() => {
        res.json({
            error: '0000',
            data: '操作成功'
        })
      })
    })
    
  })
  
  
});

module.exports = router;