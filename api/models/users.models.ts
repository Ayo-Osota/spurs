import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { UserI } from "../interfaces";

const userSchema = new Schema<UserI>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true },)

userSchema.pre("save", async function (next) {
    let user = this as UserI;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt();

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (password: string) {
    const user = this as UserI;

    return bcrypt.compare(password, user.password).catch((e) => false);
};

export const User = model<UserI>("User", userSchema);