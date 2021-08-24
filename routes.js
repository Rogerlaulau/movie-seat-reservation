
const express = require("express");
const MovieModel = require("./movie_model");
//const UserModel = require("./user_model");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());


app.get('/api', (req, res) => {
    console.log('/api');
    res.json({
        message: 'Welcome to the API'
    });
});

app.get('/api/initialize', async (req, res) => {
    console.log('/api/initialize');
    const movie_0 = MovieModel.create({movie_id:0, movie_name: 'Aquaman', seat_occupied:[]});
    const movie_1 = MovieModel.create({movie_id:1, movie_name: 'Fast & Furious', seat_occupied:[]});
    const movie_2 = MovieModel.create({movie_id:2, movie_name: 'Toy Story 4', seat_occupied:[]});
    const movie_3 = MovieModel.create({movie_id:3, movie_name: 'The Lion King', seat_occupied:[]});

    try {
        await movie_0.save();
        await movie_1.save();
        await movie_2.save();
        await movie_3.save();
        //res.send(movie);
        res.status(200).send("Movie data initialized")
    } catch (error){
        res.status(500).send(error);
    }
});



app.post('/api/movie', (req, res) =>{
    console.log("/api/movie - movie_id:", req.body.movie_id);
    // return {"movie":{"seat_occupied":[],"_id":"6122516c76f6851748b770aa","movie_id":3,"movie_name":"The Lion King","__v":0}}
    MovieModel.findOne({movie_id: req.body.movie_id})
    .exec(function (err, movie) {
        if (err) return handleError(err);
        console.log(movie);
        res.json({
            movie: movie
        });
    });
});


app.post('/api/movie/reserve', (req, res) => {
    console.log("/api/movie/reserve - req.body:", req.body);
    if (Array.isArray(req.body.reserve)){
        const reserve = req.body.reserve;

        MovieModel.findOne({movie_id: req.body.movie_id},
            async function (err, movie) {
                let temp_occupied = movie["seat_occupied"];
                await temp_occupied.push(...req.body.reserve);

                await MovieModel.findOneAndUpdate(
                    {movie_id: req.body.movie_id},
                    {seat_occupied: temp_occupied},
                    function (err, updated) {
                        console.log('line 68: ', updated)
                    }
                );
                res.json({
                    occupied: temp_occupied,
                }); 
            }
        ); 
        
    } else {
        //console.log('N');
        res.status(400).send("Invalid data type")
    }
});

module.exports = app;
