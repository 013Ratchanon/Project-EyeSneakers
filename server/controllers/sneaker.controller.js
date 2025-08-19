import Sneaker from "../models/sneaker.model.js";
const sneakerController = {};
//Create and save a new sneaker
sneakerController.create = async (req, res) => {
  const { name, type, imgUrl } = req.body;
  //validate data
  if (!name || !type || !imgUrl) {
    res
      .status(400)
      .send({ message: "Name, type or ImageUrl can nit be empty na ja !!" });
    return;
  }

  await Sneaker.findOne({
    where: {
      name: name,
    },
  }).then((sneaker) => {
    if (sneaker) {
      res.status(400).send({ message: "Sneaker already exists!" });
      return;
    }
    const newSneaker = {
      name: name,
      type: type,
      imgUrl: imgUrl,
    };
    Sneaker.create(newSneaker)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "something error while creating the sneaker",
        });
      });
  });
};
//Get ALL
sneakerController.getAll = async (req, res) => {
  await Sneaker.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "something error while getting the sneaker",
      });
    });
};
//Get sneaker byid
sneakerController.getById = async (req, res) => {
  const id = req.params.id;
  await Sneaker.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "NO found sneaker with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  sneaker with id" + id,
      });
    });
};
//update
sneakerController.update = async (req, res) => {
  const id = req.params.id;
  const { name, type, imgUrl } = req.body;
  //validate data
  if (!name && !type && !imgUrl) {
    res
      .status(400)
      .send({ message: "Name, type And ImgUrl can nit be empty na ja !!" });
    return;
  }
  await Sneaker.update(
    { name, type, imgUrl },
    {
      where: { id },
    }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({ message: "Sneaker update successfully!" });
      } else {
        res.status(400).send({
          message:
            "Cannot update sneaker with id" +
            id +
            ". Maybe sneaker was not found .",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  sneaker with id" + id,
      });
    });
};
//Delete
sneakerController.delete = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).send({ message: "Id is missing" });
    return;
  }
  await Sneaker.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Sneaker was deleted successfully" });
      } else {
        res.status(400).send({
          message: "Cannot delete sneaker with id" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "something error while getting  sneaker with id" + id,
      });
    });
};
export default sneakerController;
