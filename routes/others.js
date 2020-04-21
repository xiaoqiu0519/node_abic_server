const express = require('express');
const router = express.Router();
const multer = require('multer');

router.get('/getcity', (req, res, next) => {
    res.json({
        error: '0000',
        data: {
            0: [{
                value: '',
                label: '不限',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '1',
                label: '马尼拉',
                children: [{
                    value: '',
                    label: '不限',
                }, {
                    value: '1',
                    label: '玛卡提',
                }, {
                    value: '2',
                    label: '帕塞',
                }]
            }, {
                value: '2',
                label: '甲美地',
                children: [{
                    value: '',
                    label: '不限',
                }, {
                    value: '1',
                    label: 'bacoor',
                }, {
                    value: '2',
                    label: 'imus',
                }]
            }, {
                value: '3',
                label: '的卡拉带点',
                children: [{
                    value: '',
                    label: '不限',
                }, {
                    value: '1',
                    label: '哈哈哈',
                }, {
                    value: '2',
                    label: 'daohang',
                }]
            }],
            1: [{
                value: '',
                label: 'all',
                children: [{
                    value: '',
                    label: 'all',
                }]
            }, {
                value: '1',
                label: 'all',
                children: [{
                    value: '',
                    label: 'all',
                }, {
                    value: '1',
                    label: '玛卡提英文',
                }, {
                    value: '2',
                    label: '帕塞英文',
                }]
            }, {
                value: '2',
                label: '甲美地英文',
                children: [{
                    value: '',
                    label: 'all',
                }, {
                    value: '1',
                    label: 'bacoor',
                }, {
                    value: '2',
                    label: 'imus英文',
                }]
            }, {
                value: '3',
                label: '的卡拉带点英文',
                children: [{
                    value: '',
                    label: 'all',
                }, {
                    value: '1',
                    label: '哈哈哈英文',
                }, {
                    value: '2',
                    label: 'daohang英文',
                }]
            }]
        }
    })
})

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}

var datatime = 'public/images/houselist';
let imgname;
//将图片放到服务器
var storage = multer.diskStorage({
    //destination  完整形态
    // destination: function (req, file, cb) {
    //     cb(null, '/tmp/my-uploads')
    // },
    // destination 是一个函数，负责创建文件夹
    destination: datatime,
    //filename 给上传文件重命名
    filename: function(req, file, cb) {
        let getime = new Date().getTime()
        imgname = getime + file.originalname
        cb(null, getime + file.originalname)
    }
});
var upload = multer({
    storage: storage
}).array('images');
// router.post('/uploads', upload.single('file'), function(req, res, next) {

//     res.send({
//         error: '0000',
//         //data: datatime + '/' + imgname,
//     })
// });
router.post('/uploads', function(req, res, next) {
    //多个文件上传
    upload(req, res, function(err) {

        if (err) {
            console.error('1.[System] ' + err.message);
        } else {
            //循环处理
            var imgPath = [];
            req.files.forEach(function(i) {
                //获取临时文件的存储路径
                imgPath.push(i.path);
                console.log("i.path:", i.path)
            });

            //所有文件上传成功
            //回复信息
            var reponse = {
                message: 'File uploaded successfully',
                imgPath
            };
            //返回
            res.end(JSON.stringify(reponse));
        }
    });
});
module.exports = router;