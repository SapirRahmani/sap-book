const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "_id"
    // },
    user_name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date_published: {
        type: Date,
        required: true,
    },
    file_name: {
        type: String,
        required: false,
    },
    tags: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;
