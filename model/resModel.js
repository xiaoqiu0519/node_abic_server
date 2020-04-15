class BaseModel {
    constructor(data, message, error) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
            error = null;
        }
    }
}

class SussessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.error = '0000'
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message, error) {
        super(data, message);
        this.error = error
    }
}

module.exports = {
    SussessModel,
    ErrorModel
}