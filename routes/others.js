const express = require('express');
const router = express.Router();

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
module.exports = router;