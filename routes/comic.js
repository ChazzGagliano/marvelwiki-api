import { Router } from "express";
import { config } from "dotenv";
import { createHash } from "crypto";
import axios from "axios";
import { comics } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

config();
const md5 = (data) => {
  const hash = createHash("md5");
  hash.update(data);
  return hash.digest("hex");
};

let public_key = process.env.public_key;
let private_key = process.env.private_key;
let ts = new Date().getTime();
let stringToHash = ts + private_key + public_key;
let hash = md5(stringToHash);

const router = Router();

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(
    `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${ts}&apikey=${public_key}&hash=${hash}`
  );
  res.json(data.data.results);
  console.log(data.data.results);
});

router.post("/like", async (req, res) => {
  const comicCollection = await comics();
  const userId = req.session.user._id;
  const { comicId } = req.body;
  const { comicName } = req.body;

  const comicExistsInDB = await comicCollection.findOne({
    comicId: comicId,
  })
  console.log(comicExistsInDB)


  if (!comicExistsInDB) {
    let comic = {
        comicId: comicId,
        comicName: comicName,
        likes: [userId]
    };
    await comicCollection.insertOne(comic);
  } else {
    await comicCollection.updateOne(
        { comicId: comicId},
        { $push: { likes: userId } },
    );
  }

  res.json({
    success: `User ${userId} liked comic ${comicId}`,
  });

});

export default router;
