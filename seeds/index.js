const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/camp-grounds');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d21514f8afe412c6ffef50',
            location: `${ cities[random1000].city }, ${ cities[random1000].state }`,
            title: `${ sample(descriptors) } ${ sample(places) }`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dtajpf2kz/image/upload/v1658260181/campGrounds/bcffhjzvmu7qz68tzsvj.jpg',
                    filename: 'campGrounds/bcffhjzvmu7qz68tzsvj',
                },
                {
                    url: 'https://res.cloudinary.com/dtajpf2kz/image/upload/v1658260213/campGrounds/atlw8d73xjj8snz6bnci.jpg',
                    filename: 'campGrounds/atlw8d73xjj8snz6bnci',
                }
            ],
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem iste eum, velit alias magnam id voluptatum natus debitis iusto quod doloremque qui, consequuntur esse hic, omnis nemo. A, vel culpa.',
            price, 
            geometry: { 
                type: "Point", 
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})