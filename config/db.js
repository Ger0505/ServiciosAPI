const moongose = require('mongoose');

const host = "localhost";
const port = "27017";
const db = "servicios";

exports.mongoConnect = () =>{
    const mongoStringConnection = `mongodb://${host}:${port}/${db}`;
    moongose.connect(mongoStringConnection,{useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    moongose.Promise = global.Promise;
    const dbConnection = moongose.connection;
    dbConnection.on("error",console.error.bind(console,"mongodb connection error"));
}