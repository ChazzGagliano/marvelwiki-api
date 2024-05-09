import express from "express";

const app = express();
import session from 'express-session';
import configRoutes from "./routes/index.js";
import cors from "cors";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
    name: 'AuthCookie', secret: 'apple bottom jeans', resave: false, saveUninitialized: false, cookie: {
        httpOnly: false, secure: false
    }
}));

configRoutes(app);

app.listen(3030, () => {
  console.log("Server is running...");
});