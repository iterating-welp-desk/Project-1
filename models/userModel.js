const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

//defining attributes on userSchema
const userSchema = new Schema({
  nameFirst: { type: String, required: true },
  nameLast: { type: String, required: true },
  handle: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  sessionId: { type: String, Index: true, Unique: true },
});

const User = mongoose.model('User', userSchema);

userSchema.methods.createUser = (body) => {
  const user = {};
  user.nameFirst = body.firstname;
  user.nameLast = body.lastname;
  user.handle = body.username;
  user.email = body.email;
  bcrypt.hash(body.password, SALT_ROUNDS, (err, hash) => {
    // Store hash in your password DB.
    user.password = hash;

    User.create(user, (err2, result) => {
      if (err2) console.log(err2);
      else console.log(result);
    });
  });
};

userSchema.methods.verifyPassword = (password) => {
  User.findOne({ handle: this.handle }, (err, user) => {
    if (err) console.log(err);
    else bcrypt.compare(password, user.password).then(res => res);
  });
};

module.exports = User;
