const fs = require('fs')

let getTime = () => {
    let time = new Date();
    let yy = time.getFullYear();
    let mm = time.getMonth() + 1;
    let dd = time.getDate();
    return yy + '-' + (mm > 10 ? mm : '0' + mm) + '-' + (dd > 10 ? dd : '0' + dd)
}

const deleteImg = (argument, type) => {
    return new Promise((resolve, reject) => {
        if (Array.isArray(argument)) {
            argument.map(ele => {
                JSON.parse(ele[type]).map((item) => {
                    fs.exists(item, (exists) => {
                        if (exists) {
                            fs.unlink(item, (err) => {
                                if (err) {
                                    throw err
                                }
                                console.log('图片删除成功')
                            })
                        } else {
                            console.log('ddddddd')
                        }
                    })
                })
            })
        } else {
            fs.exists(argument, (exists) => {
                if (exists) {
                    fs.unlink(ele, (err) => {
                        if (err) {
                            console.log('文件不存在')
                            throw err
                        }
                        console.log('文件删除成功')
                    })
                }
            })
        }
        resolve()
    })
}


module.exports = {
    getTime,
    deleteImg
}