const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const schema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        unique: true,
        default: null
    },
    surname: {
        type: String,
        default: ''
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        default: ''
    }
});

schema.plugin(passportLocalMongoose, { usernameField: 'email' })
schema.plugin(findOrCreate)

let UserModel = new mongoose.model('User', schema);

passport.serializeUser((user, done) => {
    done(null, user._id)
});
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user)
    })
});

passport.use(UserModel.createStrategy())

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/angime"
    }, async (accessToken, refreshToken, email, cb) => {
        UserModel.findOrCreate({email: email._json.email, googleId: email.id}, (err, user) => {
            return cb(err, user);
        })
    }
));

module.exports = UserModel;