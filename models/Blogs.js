const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    like: {
        type: Array,
        "default": []
    },

    tags: {
        type: Array,
        "default": []
    },
});

module.exports = mongoose.model("blogs", Blog);
