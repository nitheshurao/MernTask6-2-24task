import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;