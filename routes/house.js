const express = require('express');
const router = express.Router();
const {
    gethouselist,
    gethousedetail,
    addhouse,
    updatehouse,
    deletehouse
} = require('../controller/house');

/* GET home page. */
// 获取房源列表 1；房产买卖 2；房产租赁 3：特价房源
router.post('/houselist', (req, res, next) => {
    const { params } = req.body;
    gethouselist(params).then(listdata => {
        res.json({
            error: '0000',
            data: listdata
        })
    })
});
// 获取房源详情
router.post('/gethousedetail', (req, res, next) => {
    const { id } = req.body;
    gethousedetail(id).then((listdata) => {
        res.json({
            error: '0000',
            data: listdata
        })
    })
});
//新增房源
router.post('/addhouse', (req, res, next) => {

    const {
        id,
        username,
        telphone,
        email,
        title, //房屋名称 描述
        city, //城市
        size,
        type, //房源类型
        tower, //单元 & 门牌号
        layout, //户型
        faceto, //朝向
        balcony, //是否有阳台
        parking, //是否有车位
        sellingprice, //总价格
        payment, //付款方式
        notes, //备注
        furniture, //家具
        used, //用途
        surrounding, //周边
        imgArr,
        introduction, //房源介绍
    } = req.body;
    addhouse(id, username, telphone, email, title, city, size, type, tower, layout, faceto, balcony, parking, sellingprice,
        payment, notes, furniture, used, surrounding, imgArr, introduction).then(() => {
        res.json({
            error: '0000',
            data: '操作成功'
        })
    })
});
//发布房源

router.post('/updatehouse', (req, res, next) => {
    const { id, status = null, type = null } = req.body;
    updatehouse(id, status, type).then(() => {
        res.json({
            error: '0000',
            mes: '修改成功'
        })
    })
});

router.post('/deletehouse', (req, res, next) => {
    const { id } = req.body;
    deletehouse(id).then(() => {
        res.json({
            error: '0000',
            mes: '删除成功'
        })
    })
})

module.exports = router;