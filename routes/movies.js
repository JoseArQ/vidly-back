const express = require('express');
const router = express.Router();

const { Genre, validate } = require('../models/Genres');
const { Movie, validateMovie } = require('../models/Movie');

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});
  
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send(error.details[0].message);

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save()
    res.send(movie);
  });

module.exports = router;
