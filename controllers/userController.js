const { readByEmail, readOne } = require("../models/User");
const User = require("../models/User");

class UserController {
  async getUsersView(req, res) {
    const data = await User.readAll();
    
    return res.render("users", {
      formCSS: "/css/loginCSS.css",
      users: data
    });
  }

  async addUserView(req, res) {
    const data = req.body;
    const newUser = new User(data);
    const register = await newUser.save();
    
    return res.render("home", {
      users: data
    });
  }

  async getUserProfileView(req, res) {
    const user = (await User.readOne(req.session.idUser))[0];

    return res.render("profile", {
      formCSS: "css/profile.css",
      userData: user,
    });
  }

  async deleteUserView(req, res) {
    const id = req.params.id;
    const data = await User.delete(id);

    return res.render("home", {
      formCSS: "/css/loginCSS.css",
    });
  }

  async updateUser(req, res) {
    const data = req.body;
    const updatedUser = new User(data);
    const validation = updatedUser.validate();

    if (validation.success) {
      updatedUser.idUser = data.idUser;
      await updatedUser.update(updatedUser);
      
      return res.redirect("/");
    }

    return res.render("profile", {
      validation,
      userData: updatedUser,
      formCSS: "css/profile.css",
    });
  }

}



module.exports = UserController;
