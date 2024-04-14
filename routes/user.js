import { Router } from "express";
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

const router = Router()
    router.post("/register", async (req, res) => {
        const userCollection = await users()
        let hashedPassword = await bcrypt.hash(req.body.password, 12) 
        let user = {
            username: req.body.username,
            password: hashedPassword
        }
        
       await userCollection.insertOne(user)
        return res.status(200).json(user);
    });

    router.get("/login", async (req, res) => {
        const userCollection = await users()
        const { username } = req.body
        const { password } = req.body
        const user = await userCollection.findOne({ 
          username: user.username,
          password: user.password
        });
        res.json(user.username);;
    })


export default router;
