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
        // const checkIfUserExists = await userCollection.findOne({username: username});
        // if (checkIfUserExists !== null) return res.json({error: "An account with this email already exists"});
        
       await userCollection.insertOne(user)
        return res.status(200).json(user);
    });

    router.post("/login", async (req, res) => {
        const userCollection = await users()
        const { userName } = req.body
        const { passWord } = req.body
        const user = await userCollection.findOne({ 
          username: userName
        });
        
        console.log(passWord)
        console.log(user)
        let compareToMatch = false;
        
        try {
            compareToMatch = await bcrypt.compare(passWord, user.password)
        } catch(e) {
        }
        if (!compareToMatch) return res.json({error: "Either the email or password is invalid"})
        console.log({success: "User authenticated"});

        user._id = user._id.toString();

    req.session.user = user;
    req.session.save();
    console.log(req.session)

    res.json({user: user, auth: true});
});

router.get('/profile', async (req, res) => {
    console.log(req.session)
    if (req.session.user) {
        const userCollection = await users()
        const user = await userCollection.findOne({_id: new ObjectId(req.session.user._id)});

        return res.json({user: user});
    } else {
        return res.json({error: "You are not logged in!"});
    }
});

    




export default router;
