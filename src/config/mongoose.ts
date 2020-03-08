import mongoose from "mongoose";
import vars from "./vars";

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// print mongoose logs in dev env
if (vars.env === 'development') {
    mongoose.set('debug', true);
}


/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
export const connect = async () => {
    const uri: any = vars.mongo.uri;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose.connection;
};

