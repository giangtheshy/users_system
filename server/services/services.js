const axios = require("axios");

exports.home = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/api/users");

    res.render("index", { users: response.data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = async (req, res) => {
  const id = req.query.id;
  try {
    const response = await axios.get("http://localhost:3000/api/users", { params: { id: id } });

    res.render("update_user", { user: response.data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
