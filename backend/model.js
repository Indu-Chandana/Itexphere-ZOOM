const mongoose = require('mongoose');

const studentData = mongoose.Schema({
    name: {
        type : String,
        require: true
    },
    lang: {
        type : String,
        require: true
    },
    capacity: {
        type : String,
        require: true
    }
})

module.exports = mongoose.model('roomname', studentData)