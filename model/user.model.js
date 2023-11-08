import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    isAdmin: Boolean,
})

const User = mongoose.models.users || mongoose.model('User', userSchema);
export default User;