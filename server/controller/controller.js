const UserDb = require("../model/model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).send({ message: "Content can't empty" });
    return;
  }
  const user = new UserDb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  user
    .save(user)
    .then((data) => {
      res.redirect("/add_user");
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while creating" });
    });
};
exports.find = (req, res) => {
  if (req.query.id) {
    UserDb.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + req.query.id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retrieving user with id " + req.query.id });
      });
  } else {
    UserDb.find()
      .then((dataUser) => {
        if (!dataUser) {
          res.status(404).send({ message: "User not found" });
        } else {
          res.send(dataUser);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: err.message || "Data not exist" });
      });
  }
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "User data update is required" });
  }
  const id = req.params.id;
  console.log(req.body);
  UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can't update user with id ${id}` });
      } else {
        console.log(req.body);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(404).send({ message: "Can't delete user with id " + req.params.id });
  } else {
    UserDb.findByIdAndDelete(req.params.id)
      .then((user) => {
        res.send({ message: "User deleted" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};
