import Restaurant from "../models/restaurant.model.js";
const restaurantController = {};
//Create and save a new restaurant
restaurantController.create = async (req, res) => {
  const { name, type, imgUrl } = req.body;
  //validate data
  if (!name || !type || !imgUrl) {
    res
      .status(400)
      .send({ message: "Name, type or ImageUrl can nit be empty na ja !!" });
    return;
  }

  await Restaurant.findOne({
    where: {
      name: name,
    },
  }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists!" });
      return;
    }
    const newRestaurant = {
      name: name,
      type: type,
      imgUrl: imgUrl,
    };
    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "something error while creating the rastaurant",
        });
      });
  });
};
//Get ALL
restaurantController.getAll = async (req, res) => {
  await Restaurant.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "something error while getting the rastaurant",
      });
    });
};
//Get restaurant byid
restaurantController.getById = async (req, res) => {
  const id = req.params.id;
  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "NO found restaurant with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  rastaurant with id" + id,
      });
    });
};
//update
restaurantController.update = async (req, res) => {
  const id = req.params.id;
  const { name, type, imgUrl } = req.body;
  //validate data
  if (!name && !type && !imgUrl) {
    res
      .status(400)
      .send({ message: "Name, type And ImgUrl can nit be empty na ja !!" });
    return;
  }
  await Restaurant.update(
    { name, type, imgUrl },
    {
      where: { id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Restaurant update successfully!" });
      } else {
        res.status(400).send({
          message:
            "Cannot update Restaurant with id" +
            id +
            ". Maybe restaurant was not found .",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  rastaurant with id" + id,
      });
    });
};
//Delete
restaurantController.delete = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "Id is missing" });
    return;
  }
  await Restaurant.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Restaurant was deleted successfully" });
      } else {
        res.status(400).send({
          message: "Cannot delete Restaurant with id" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  rastaurant with id" + id,
      });
    });
};
export default restaurantController;
