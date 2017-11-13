const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdip3-development';
mongoose.connect(dbURI, { useMongoClient: true });

const User = require('../models/user');
const Shop = require('../models/shop');

User.collection.drop();
Shop.collection.drop();

User
  .create([{
    userType: 'Donor',
    username: 'CamJones',
    email: 'cam@cam.com',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    userType: 'Donor',
    username: 'HannahCross',
    email: 'han@han.com',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    userType: 'Shop Owner',
    username: 'CatrionaO',
    email: 'cat@cat.com',
    password: 'password',
    passwordConfirmation: 'password'
  },
  {
    userType: 'Shop Owner',
    username: 'camJ',
    email: 'camj@camj.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Shop
      .create([{
        name: 'Oxfam ',
        address: {
          line1: '22',
          line2: 'Park Rd',
          city: 'London',
          postcode: 'N8 8TD',
          country: 'UK'
        },
        email: 'oxfam@oxfam.com',
        number: '020 8347 7942',
        bio: 'charity shop with lots of things in it',
        image: 'https://farm8.staticflickr.com/7391/9459072973_513584071c.jpg',
        clothesWanted: 'jeans, t-shirts, hats',
        clothesNotWanted: 'shoes',
        // createdBy: 'a',
        // comments: 'a'
      },{
        name: 'Cancer Research Highgate',
        address: {
          line1: '72',
          line2: 'Highgate High St',
          city: 'London',
          postcode: 'N6 5HX',
          country: 'UK'
        },
        email: 'cr@cr.com',
        number: '020 8341 6330',
        bio: 'charity shop with lots of things in it',
        image: 'http://s3.amazonaws.com/ldc/large/2268/22686148.jpg',
        clothesWanted: 'jeans, t-shirts',
        clothesNotWanted: 'shoes, hats',
        // createdBy: 'a',
        // comments: 'a'
      }]);
  })
  .then((shops) => {
    console.log(`${shops.length} shops created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
