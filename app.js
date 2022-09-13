const { urlencoded } = require("express");
const express = require("express");
const app = express();
const router = require("./src/Profile/router");
const connectDB = require("./src/utils/database.js");
const PORT = 3000;

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(router);


connectDB()
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`App started on port ${PORT}`);
        });
    });
  
    
