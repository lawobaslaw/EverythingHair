import mongoose from 'mongoose'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },

    token: {
        type: String
    }


}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    return userObject;
}

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next()
})

/**Generate Token */
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);
    user.token = token;
    await user.save()
    return token;
}

/**Compare Password */
userSchema.statics.comparePassword = async (email, plainPassword, res) => {
    const findUser = await User.findOne({ email });
    if (!findUser) return res.status(404).json({ error: 'Wrong Email or Password' });
    const isMatch = await bcrypt.compare(plainPassword, findUser.password)
    if (!isMatch) return res.status(404).json({ error: 'Wrong Email or Password' });
    return findUser;
}


const User = mongoose.model('User', userSchema);

export default User