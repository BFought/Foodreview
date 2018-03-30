const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
app.use(express.static(path.join( __dirname,  '/public/dist' )));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/restaurants');
mongoose.Promise = global.Promise;

var RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Restaurant name is required.'], minlength: [3, 'Must be at least 3 characters.'], unique: true, trim: true},
    cuisine :{ type: String, required: [true, 'Cuisine type is required.'], minlength: [3, 'Must be at least 3 characters.']},
    reviews: [{ type: Schema.Types.ObjectId, ref:'Review'}]
},{timestamps: true})

var ReviewSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'You must provide your name'], minlength: [3, 'Must be at least 3 characters.']},
    star : {type: Number, required: [true, 'You must provide a rating']},
    review: { type: String, required: [true, 'You must provide a review'], minlength: [3, 'Must be at least 3 characters.']},
    _restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant'}
},{timestamps: true})


mongoose.model('Restaurant', RestaurantSchema); // We are setting this Schema in our Models as 'Restaurant'
mongoose.model('Review', ReviewSchema); // We are setting this Schema in our Models as 'Review'

var Restaurant = mongoose.model('Restaurant');
var Review = mongoose.model('Review');

app.get("/restaurants", (req, res) => {
    //Retrieve all Restaurants
    Restaurant.find({}, function(err,restaurants){
        res.json({restaurants});
    });
})
app.get("/restaurants/:id", (req, res) => {
    //Retrieve a Restaurant by ID
    const id = req.params.id;
    Restaurant.findOne({_id:id})
    .populate({path: 'reviews', options: { sort: '-star' }})
    .exec(function(err, restaurant){
        console.log(restaurant);
        res.json(restaurant);
    });
})
app.post("/restaurants", (req, res) => {
    // Create a Restaurant
    restaurant = new Restaurant(req.body);
    restaurant.save(function(err, restaurant) {
        if (err && (11000 === err.code || 11001 === err.code)) {
            res.json({message: 'error', errors:['Restaurant is a duplicate']})
        }
        else if(err){
            let errors =[];
            for(let key in err.errors){
                errors.push(err.errors[key].message);
            }
            res.json({message: 'error', errors:errors})
        }
        else{
            res.json({ message: 'success', restaurant});
        }
    });
})
app.put("/restaurants/:id", (req, res) => {
    // Update a Restaurant by ID
    const id = req.params.id;
    var opts = { runValidators:true };
    Restaurant.update({_id:id}, req.body, opts,
        function(err,restaurant){
        if(err){
            let errors =[];
            for(let key in err.errors){
                errors.push(err.errors[key].message);
            }
            res.json({message: 'error', errors: errors})
        }
        else{
            res.json({ message: 'success', restaurant});
        }
    });
})
app.delete("/restaurants/:id", (req, res) => {
    // Delete a Restaurant by ID
    const id = req.params.id;
    console.log(id);
    Restaurant.remove({_id:id}, function(err){
        res.json({});
    });
})
//--------------Reviews----------------//
app.post("/restaurants/comments/:id", (req, res) => {
    //---Create a Review --//
    Restaurant.findOne({_id: req.params.id}, (err, restaurant)=>{
        if(err){
            res.send(err);
        }
        else{
            let review = new Review(req.body);
            review._restaurant = restaurant._id
            review.save(function(err){
                if(err){
                    console.log(err);
                    let errors =[];
                    for(let key in err.errors){
                        errors.push(err.errors[key].message);
                    }
                    res.json({message: 'error', errors: errors})
                }
                else{
                    restaurant.reviews.push(review);
                    restaurant.save(function(err,review){
                        res.json({ message: 'success', review: review});
                    })
                }
            })
        }
    });
});

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000")
})
