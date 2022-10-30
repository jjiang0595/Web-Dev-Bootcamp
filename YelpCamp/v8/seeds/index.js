const mongoose = require('mongoose')
const cities = require('./cities')
const Campground = require('../models/campground')
const { descriptors, places } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("DATABASE CONNECTED")
    })
    .catch((err) => {
        console.log("connection error")
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '635835f3d7609eb6bb0b5b86',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquam aspernatur delectus ipsa ipsum minus natus, rerum! Eligendi ex omnis reiciendis tenetur ut vel! Expedita laborum nulla repudiandae sint!',
            price,
            geometry:  { type: 'Point', coordinates: [cities[random1000].longitude,
                cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbhoh3pzm/image/upload/v1666991480/YelpCamp/isr49u28umrqtezucv3w.jpg',
                    filename: 'YelpCamp/isr49u28umrqtezucv3w',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
