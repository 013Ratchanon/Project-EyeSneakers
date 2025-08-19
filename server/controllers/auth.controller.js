import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const authController = {};

// =================== SIGNUP ===================
authController.signUp = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).send({ message: "Username is already existed" });
    }

    const newUser = {
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    };

    const user = await User.create(newUser);

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: { [Op.or]: req.body.roles },
        },
      });

      if (!roles || roles.length === 0) {
        await user.setRoles([1]);
        return res.send({ message: "User registered successfully3" });
      } else {
        await user.setRoles(roles);
        return res.send({ message: "User registered successfully1" });
      }
    } else {
      await user.setRoles([1]);
      return res.send({ message: "User registered successfully2" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Something error while registering a new user",
    });
  }
};

// =================== SIGNIN ===================
authController.signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username or password are missing" });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ username: user.username }, config.secret, {
      expiresIn: 86400,
    });

    const roles = await user.getRoles();
    const authorities = roles.map((role) => "ROLES_" + role.name.toUpperCase());

    return res.send({
      token: token,
      authorities: authorities,
      userInfo: {
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Something error while Signin!",
    });
  }
};

export default authController;
