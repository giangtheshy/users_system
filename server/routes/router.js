const express = require("express");
const services = require("../services/services");
const controller = require("../controller/controller");
const route = express.Router();

route.get("/", services.home);
route.get("/add_user", services.add_user);
route.get("/update_user", services.update_user);

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
