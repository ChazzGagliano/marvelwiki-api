import characterRoutes from "./character.js"

const constructorMethod = (app) => {
    app.use("/character", characterRoutes);
  
    app.use("*", (req, res) => {
      res.status(404).json({ error: "This route does not exist" });
    });

  };
  
  export default constructorMethod;