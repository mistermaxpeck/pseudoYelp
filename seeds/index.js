const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers.js');

mongoose.connect('mongodb://127.0.0.1:27017/pseudoCamp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quod perspiciatis possimus temporibus. Velit quam molestiae molestias, veritatis ab doloremque facere pariatur veniam voluptatem, temporibus illum! Eos nesciunt omnis est!',
            price
        })
    await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})