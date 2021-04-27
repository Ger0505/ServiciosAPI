const moongose = require('mongoose');

const host = "localhost";
const port = "27017";
const db = "servicios";

exports.mongoConnect = () =>{
    const mongoStringConnection = 'mongodb+srv://admin:EWziBosHvCbQb3N9@servicios.ar8jf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'  //`mongodb://${host}:${port}/${db}`;
    moongose.connect(mongoStringConnection,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    moongose.Promise = global.Promise;
    const dbConnection = moongose.connection;
    dbConnection.on("error",console.error.bind(console,"mongodb connection error"));
}