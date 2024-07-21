import { Router } from "express";
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const router = Router();
router.post("/register", async (req, res) => {
  const userCollection = await users();
  let hashedPassword = await bcrypt.hash(req.body.password, 12);
  let user = {
    username: req.body.username,
    password: hashedPassword,
    characters: [],
    cart: [],
    orders: [],
  };
  const checkIfUserExists = await userCollection.findOne({
    username: req.body.username,
  });
  if (checkIfUserExists !== null)
    return res.json({ error: "An account with this email already exists" });

  await userCollection.insertOne(user);
  return res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  const userCollection = await users();
  const { userName } = req.body;
  const { passWord } = req.body;
  const user = await userCollection.findOne({
    username: userName,
  });

  console.log(passWord);
  console.log(user);
  let compareToMatch = false;

  try {
    compareToMatch = await bcrypt.compare(passWord, user.password);
  } catch (e) {}
  if (!compareToMatch)
    return res.json({ error: "Either the email or password is invalid" });
  console.log({ success: "User authenticated" });

  user._id = user._id.toString();

  req.session.user = user;
  req.session.save();
  console.log(req.session);

  res.json({ user: user, auth: true });
});

router.get("/logout", async (req, res) => {
    console.log(req.session)
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to log out. Please try again." });
            }
            return res.status(200).json({ message: "Logged out successfully" });
        });
    } else {
        return res.status(401).json({ error: "You are not logged in!" });
    }
});

router.get("/profile", async (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    const userCollection = await users();
    const user = await userCollection.findOne({
      _id: new ObjectId(req.session.user._id),
    });

    return res.json({ user: user });
  } else {
    return res.json({ error: "You are not logged in!" });
  }
});

router.delete("/delete-account", async (req, res) => {
    if (req.session.user) {
      try {
        const userCollection = await users();
        const result = await userCollection.deleteOne({
          _id: new ObjectId(req.session.user._id),
        });
  
        if (result.deletedCount === 1) {
            req.session.destroy(); 
            return res.status(200).json({ message: "User deleted successfully" });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "An error occurred while deleting the user" });
        }
      } else {
        return res.status(401).json({ error: "You are not logged in!" });
      }
  });
  

router.post("/character/like", async (req, res) => {
  console.log(req.session);
  const userCollection = await users();
  const userId = req.session.user._id;
  const { characterId } = req.body;
  const { characterName } = req.body;
  const { characterImage } = req.body;

  await userCollection.updateOne(
    { _id: new ObjectId(userId) },
    {
      $push: {
        characters: {
          characterId: characterId,
          characterName: characterName,
          characterImage: characterImage,
        },
      },
    }
  );
  res.json({
    success: `User ${userId} liked character ${characterId}`,
  });
});

router.post("/character/unlike", async (req, res) => {
    console.log(req.session);
    const userCollection = await users();
    const userId = req.session.user._id;
    const { characterId } = req.body;
    const { characterName } = req.body;
    const { characterImage } = req.body;
  
    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          characters: {
            characterId: characterId,
            characterName: characterName,
            characterImage: characterImage,
          },
        },
      }
    );
    res.json({
      success: `User ${userId} removed character ${characterId}`,
    });
  });

  router.post("/cart/add", async (req, res) => {
    console.log(req.session);
    const userCollection = await users()
    const userId = req.session.user._id;
    const { comicId } = req.body;
    const { comicTitle } = req.body;
    const { comicPrice } = req.body;
    const { comicImage } = req.body

    await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
            $push: {
                cart: {
                    comicId: comicId,
                    comicTitle: comicTitle,
                    comicPrice: comicPrice,
                    comicImage: comicImage,
                }
            }
        }
    )
    res.json({
        success: `User ${userId} added ${comicId} to cart`,
      });
})

router.post("/cart/remove", async (req, res) => {
    console.log(req.session);
    const userCollection = await users()
    const userId = req.session.user._id;
    const { comicId } = req.body;
    const { comicTitle } = req.body;
    const { comicPrice } = req.body;
    const { comicImage } = req.body

    await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
            $pull: {
                cart: {
                    comicId: comicId,
                    comicTitle: comicTitle,
                    comicPrice: comicPrice,
                    comicImage: comicImage,
                }
            }
        }
    )
    res.json({
        success: `User ${userId} added ${comicId} to cart`,
      });
})

router.post("/cart/order", async (req, res) => {
    console.log(req.session);
    const userCollection = await users();
    const userId = req.session.user._id;
    const { cart } = req.body;

    await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { cart: [] } }
    );
    res.json({
      success: `Order placed, ${cart} removed`,
    });
  });

router.get("/cart", async (req, res) => {
    console.log(req.session);
    if (req.session.user) {
      const userCollection = await users();
      const user = await userCollection.findOne({
        _id: new ObjectId(req.session.user._id),
      });
  
      return res.json({ user: user });
    } else {
      return res.json({ error: "You are not logged in!" });
    }
  });

  router.post("/add/order", async (req, res) => {
    console.log(req.session)
    const userCollection = await users()
    const userId = req.session.user._id
    const { cart } = req.body
    const { totalPlusShipping } = req.body

    await userCollection.updateOne(
        { _id: new ObjectId(userId) },
        {
            $push: {
                order: {
                    cart: cart,
                    totalPlusShipping: totalPlusShipping,
                }
            }
        }
    )
    res.json({
        success: `User ${userId} order is on the way!`,
      });
  })

export default router;

