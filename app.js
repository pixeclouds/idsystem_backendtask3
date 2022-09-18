const { urlencoded } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const  helmet = require("helmet")
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const router = require("./src/modules/Profile/router");
const connectDB = require("./src/utils/database.js");
const PORT = 3000;

//apply middlewares to all request
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(urlencoded({ extended: false }));


const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 30, // Limit each IP to 30 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(router);

connectDB()
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`App started on port ${PORT}`);
        });
    });
  
    
