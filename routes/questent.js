var express = require('express');
var router = express.Router();
const {
    getquestent,
    addquestent,
    deletequestent
} = require('../controller/questent');
/* GET users listing. */
/**获取问题列表 */
router.get('/getlist', function(req, res, next) {
    getquestent().then((listdata) => {
        res.json({
            error: '0000',
            data: listdata
        })
    })
});
/**新增  修改问题 */
router.post('/addquestent', (req, res, next) => {
    const { id, questent_c, answer_c, questent_e, answer_e } = req.body;
    if (!questent_c.trim() || !answer_c.trim() || !questent_e.trim() || !answer_e.trim()) {
        res.json({
            error: 'GW_10000',
            mes: '参数不能为空'
        })
        return;
    }
    addquestent(id, questent_c, answer_c, questent_e, answer_e).then((listdata) => {
        res.json({
            error: '0000',
            mes: "操作成功",
        })
    })
});
/**删除问题 */
router.post('/deletequestent', (req, res, next) => {
    const { id } = req.body;
    deletequestent(id).then(() => {
        res.json({
            error: '0000',
            mes: "操作成功",
        })
    })
});

module.exports = router;