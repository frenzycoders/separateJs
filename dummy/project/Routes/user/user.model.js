const mongoose = require('mongoose');
const lodash = require('lodash');
const jwt = require('jsonwebtoken');
const bcryptJs = require('bcryptjs');
const access = 'iamjack56';
const secret = 'blackcoder56';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: null
    },
    password: {
        type: String,

    },
    number: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Boolean,
        default: false,
    },
    activationString: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function () {
    let User = this;
    let UserObj = User.toObject();
    return lodash.pick(UserObj, ['_id', 'name', 'username', 'img', 'email', 'number', 'status']);
}

UserSchema.methods.genUserToken = function () {
    let User = this;
    let token = jwt.sign({ _id: User._id.toHexString(), access }, secret).toString();
    User.tokens = User.tokens.concat([{
        access,
        token
    }]);
    return User.save().then(() => {
        return token;
    });
}

UserSchema.statics.findUserByToken = function (token) {
    let User = this;
    let decode;
    try {
        decode = jwt.verify(token, secret);
    } catch (error) {
        return Promise.reject();
    }
    return User.find({
        '_id': decode._id,
        'tokens.token': token,
        'tokens.access': access
    });
}

UserSchema.statics.findUserByCredentials = function (username, password) {
    let User = this;

    return User.findOne({ username }).then((ad) => {

        if (!ad) return Promise.reject(404);
        return new Promise((resolve, reject) => {
            bcryptJs.compare(password, ad.password, (err, res) => {
                if (res) resolve(ad);
                else reject(400);
            });
        });
    });
}

UserSchema.methods.removeUserToken = function (token) {
    let User = this;
    return User.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
}

UserSchema.pre('save', function (next) {
    let User = this;
    if (User.isModified('password')) {
        bcryptJs.genSalt(7, (err, salt) => {
            bcryptJs.hash(User.password, salt, (err, hash) => {
                User.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
