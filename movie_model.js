const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movie_id:{
        type: Number,
        required: true
    },
    movie_name:{
        type: String,
        required: true,
    },
    seat_occupied: {
        type: Array,
        value: []
    },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;