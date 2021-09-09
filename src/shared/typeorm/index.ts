import {createConnection} from "typeorm";

createConnection().catch((error) => {
    console.log(`Error connecting to database. ${error.stack}`);
});