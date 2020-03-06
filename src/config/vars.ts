import * as dotenv from "dotenv";
dotenv.config(); // default will take .env file

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongo: {
        uri: process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI
    },
    logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

