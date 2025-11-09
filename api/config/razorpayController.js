const razorpay =  require('razorpay');
const dotenv = require('dotenv');

dotenv.config({path:'./.env'});

const Test_Key = process.env.TEST_API_KEY;
const Test_SecretKey = process.env.TEST_KEY_SECRET;

const razorpayInstance = new razorpay({
    key_id : Test_Key,
    key_secret : Test_SecretKey
})

module.exports = razorpayInstance;