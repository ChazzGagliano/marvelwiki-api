import characterRoutes from "./character.js"
import comicRoutes from "./comic.js"
import storieRoutes from "./storie.js"
import userRoutes from "./user.js"
import eventRoutes from "./event.js"

const constructorMethod = (app) => {
    app.use("/characters", characterRoutes);
    app.use("/comic", comicRoutes);
    app.use("/storie", storieRoutes);
    app.use("/event", eventRoutes)
    app.use("/user", userRoutes)
    app.use("*", (req, res) => {
      res.status(404).json({ error: "This route does not exist" });
    });

  };
  
  export default constructorMethod;