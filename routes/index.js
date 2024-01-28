import characterRoutes from "./character.js"
import comicRoutes from "./comic.js"

const constructorMethod = (app) => {
    app.use("/characters", characterRoutes);
    app.use("/comic", comicRoutes);
    app.use("*", (req, res) => {
      res.status(404).json({ error: "This route does not exist" });
    });

  };
  
  export default constructorMethod;