import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 1,
            maxLegth: 30
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLegth: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
         }
    },

    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);