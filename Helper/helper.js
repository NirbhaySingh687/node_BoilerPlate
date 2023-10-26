const {errorMessages, successMessages} = require("./message");


exports.successResponse = (req, res, data, message = successMessages.OPERATION_COMPLETED, code = 200) => {
    res.status(code);
    res.send({
        code,
        success: true,
        message,
        data,
    });
};

exports.errorResponse = (req, res, message = errorMessages.SOMETHING_WENT_WRONG, code = 500) => {
    res.status(code);
    res.send({
        code,
        success: false,
        message,
        data: {},
    });
};