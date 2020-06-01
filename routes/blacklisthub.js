var express = require('express');
var router = express.Router();
const {
    getblacklist,
    udatestatus,
    updatecon,
    deleteblack,
} = require('../controller/blacklisthub');
const {
    deleteImg
} = require('../tool/index')
    /* GET users listing. */
    /**获取吐槽小站列表 */
router.post('/getlist', function(req, res, next) {
    const { status, id, pageSize, pageNum } = req.body
    getblacklist(status, id, pageSize, pageNum).then((result) => {
        res.json({
            error: '0000',
            data: result[0],
            total: result[1][0][0].total
        })
    })
});
/**新增吐槽小站 */
// router.post('/addblack', (req, res, next) => {
//     const { title, content, telphone } = req.body;
//     if (!title.trim() || !content.trim() || !telphone.trim()) {
//         res.json({
//             error: 'GW_10000',
//             mes: '参数不能为空'
//         })
//         return;
//     }
//     addblack(title, content, telphone).then(() => {
//         res.json({
//             error: '0000',
//             mes: '吐槽成功，待审核',
//         })
//     })
// });
/**修改吐槽小站状态 */
router.post('/udatestatus', (req, res, next) => {
    const { id, status } = req.body;
    if (!id) {
        res.json({
            error: 'GW_10000',
            mes: '参数不能为空'
        })
        return;
    }
    udatestatus(id, status).then(() => {
        res.json({
            error: '0000',
            mes: '修改成功',
        })
    })
});
/**吐槽小站内容编辑 */
router.post('/updatecon', (req, res, next) => {
    updatecon(req, res).then(() => {
        res.json({
            error: '0000',
            mes: '修改成功',
        })
    })
});

/**删除吐槽小站 */
router.post('/deleteblack', (req, res, next) => {
    const { id } = req.body;
    getblacklist(null, id).then((data) => {
        if (data[0] && data[0][0].length != 0) {
            deleteImg(data[0][0], 'imgs').then((result) => {
                deleteblack(id).then(() => {
                    res.json({
                        error: '0000',
                        mes: "操作成功",
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

});

module.exports = router;