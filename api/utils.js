var mongoose = require('mongoose');
var User     = mongoose.model('User');

const getCurrentUser = (req, res, callback) => {
    console.log('Finding author with email ' + req.payload.email);
    if (req.payload.email) {
        User.findOne({
            email: req.payload.email
        }).exec(function (err, user) {
            if (!user) {
                sendJSONresponse(res, 404, {
                    message: 'User not found',
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(user);
            callback(req, res, user.name);
        });
    } else {
        sendJSONresponse(res, 404, {
            message: 'User not found',
        });
        return;
    }
};

module.exports = getCurrentUser;