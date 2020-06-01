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
                label: '马尼拉大都市',
                children: [{
                        value: '',
                        label: '不限',
                    }, {
                        value: '1',
                        label: 'Manila',
                    }, {
                        value: '2',
                        label: 'Makati',
                    },
                    {
                        value: '3',
                        label: 'BGC',
                    }, {
                        value: '4',
                        label: 'Taguig',
                    }, {
                        value: '5',
                        label: 'Ortigas',
                    }, {
                        value: '6',
                        label: 'Mandaluyong',
                    }, {
                        value: '8',
                        label: 'Pasig',
                    }, {
                        value: '9',
                        label: 'Pasay',
                    }, {
                        value: '10',
                        label: 'Paranaque',
                    }, {
                        value: '11',
                        label: 'Las pinas',
                    }, {
                        value: '12',
                        label: 'Alabang'
                    }, {
                        value: '13',
                        label: 'Quezon'
                    }
                ]
            }, {
                value: '2',
                label: '甲美地',
                children: [{
                    value: '',
                    label: '不限',
                }, {
                    value: '1',
                    label: 'Bacoor',
                }, {
                    value: '2',
                    label: 'Imus',
                }, {
                    value: '3',
                    label: 'General trias',
                }, {
                    value: '4',
                    label: 'Silang',
                }]
            }, {
                value: '3',
                label: '布拉干',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '4',
                label: '拉古纳',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '5',
                label: '大雅台',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '6',
                label: '邦板牙',
                children: [{
                    value: '',
                    label: '不限',
                }, {
                    value: '1',
                    label: 'Clark',
                }]
            }, {
                value: '7',
                label: '达沃',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '8',
                label: '宿务',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '9',
                label: '长滩岛',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }, {
                value: '10',
                label: '巴拉望',
                children: [{
                    value: '',
                    label: '不限',
                }]
            }],
            1: [{
                value: '',
                label: 'All',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '1',
                label: 'Metro Manila',
                children: [{
                        value: '',
                        label: 'All',
                    }, {
                        value: '1',
                        label: 'Manila',
                    }, {
                        value: '2',
                        label: 'Makati',
                    },
                    {
                        value: '3',
                        label: 'BGC',
                    }, {
                        value: '4',
                        label: 'Taguig',
                    }, {
                        value: '5',
                        label: 'Ortigas',
                    }, {
                        value: '6',
                        label: 'Mandaluyong',
                    }, {
                        value: '8',
                        label: 'Pasig',
                    }, {
                        value: '9',
                        label: 'Pasay',
                    }, {
                        value: '10',
                        label: 'Paranaque',
                    }, {
                        value: '11',
                        label: 'Las pinas',
                    }, {
                        value: '12',
                        label: 'Alabang'
                    }, {
                        value: '13',
                        label: 'Quezon'
                    }
                ]
            }, {
                value: '2',
                label: 'Cavite',
                children: [{
                    value: '',
                    label: 'All',
                }, {
                    value: '1',
                    label: 'Bacoor',
                }, {
                    value: '2',
                    label: 'Imus',
                }, {
                    value: '3',
                    label: 'General trias',
                }, {
                    value: '4',
                    label: 'Silang',
                }]
            }, {
                value: '3',
                label: 'Bulacan',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '4',
                label: 'Laguna',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '5',
                label: 'Tagaytay',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '6',
                label: 'Pampanga',
                children: [{
                    value: '',
                    label: 'All',
                }, {
                    value: '1',
                    label: 'Clark',
                }]
            }, {
                value: '7',
                label: 'Davao',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '8',
                label: 'Cebu',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '9',
                label: 'Boracay',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }, {
                value: '10',
                label: 'Palawan',
                children: [{
                    value: '',
                    label: 'All',
                }]
            }],
        }
    })
})
var datatime = 'public/images/houselist';
let imgname;
//将图片放到服务器
var storage = multer.diskStorage({
    destination: datatime,
    filename: function(req, file, cb) {
        let getime = new Date().getTime()
        imgname = getime + file.originalname
        cb(null, getime + file.originalname)
    }
});
var upload = multer({
    storage: storage
});
router.post('/uploads', upload.single('file'), function(req, res, next) {
    res.send({
        error: '0000',
        data: datatime + '/' + imgname,
    })
});
// router.post('/uploads', function(req, res, next) {
//     //多个文件上传
//     upload(req, res, function(err) {

//         if (err) {
//             console.error('1.[System] ' + err.message);
//         } else {
//             //循环处理
//             var imgPath = [];
//             req.files.forEach(function(i) {
//                 //获取临时文件的存储路径
//                 imgPath.push(i.path);
//                 console.log("i.path:", i.path)
//             });

//             //所有文件上传成功
//             //回复信息
//             var reponse = {
//                 message: 'File uploaded successfully',
//                 imgPath
//             };
//             //返回
//             res.end(JSON.stringify(reponse));
//         }
//     });
// });
module.exports = router;