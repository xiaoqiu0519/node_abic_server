var express = require('express');
var router = express.Router();
const {
    addauthorize,
    getauthorize,
    updateauthorize,
    deletelist
} = require('../controller/authorize');
/* GET users listing. */
/**获取在线授权列表 */
router.post('/getlist', (req, res, next) => {
    const { status } = req.body;
    getauthorize(status).then((listdata) => {
        res.json({
            error: '0000',
            data: listdata
        })
    })
});
/**改变在线授权状态 */
router.post('/updateauthorize', (req, res, next) => {
    const { id, status } = req.body;
    updateauthorize(id, status).then(() => {
        res.json({
            error: '0000',
            data: '修改成功'
        })
    })
});
/**新增在线授权 */
router.post('/addauthorize', function(req, res, next) {
    const {
        username,
        telphone,
        email,
        title,
        used,
        tower,
        layout,
        size,
        faceto,
        balcony,
        parking,
        sellingprice,
        payment,
        notes,
        furniture,
        type
    } = req.body;
    addauthorize(
        username,
        telphone,
        email,
        title,
        used,
        tower,
        layout,
        size,
        faceto,
        balcony,
        parking,
        sellingprice,
        payment,
        notes,
        furniture,
        type,
    ).then((listdata) => {
        res.json({
            error: '0000',
            data: '操作成功'
        })
    })
});
/**删除在线授权列表 */

router.post('/deletelist', (req, res, next) => {
    const { id } = req.body;
    deletelist(id).then(() => {
        res.json({
            error: '0000',
            data: '操作成功'
        })
    })

});
module.exports = router;