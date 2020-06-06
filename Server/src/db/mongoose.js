let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

});

module.exports = {mongoose};
