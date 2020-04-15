let getTime = () => {
    let time = new Date();
    let yy = time.getFullYear();
    let mm = time.getMonth() + 1;
    let dd = time.getDate();
    return yy + '-' + (mm > 10 ? mm : '0' + mm) + '-' + (dd > 10 ? dd : '0' + dd)
}

module.exports = {
    getTime
}