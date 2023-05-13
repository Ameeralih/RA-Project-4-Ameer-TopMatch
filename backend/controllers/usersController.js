const { User } = require("../db/models");

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.getUserByEmail = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.create({ email, balance: 750000000 });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
};

exports.updateUserNameAndTeam = async (req, res) => {
  const { email, name, team_name } = req.body;

  try {
    const filter = {
      where: {
        email,
      },
    };

    const updateData = {
      name,
      team_name,
    };

    const rowsAffected = await User.update(updateData, filter);

    if (rowsAffected[0] > 0) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(404).json({ message: "No record updated" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

exports.getUserBalance = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const balance = user.balance;

    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user balance" });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { userId, newBalance } = req.body;

    const updatedUser = await User.update(
      { balance: newBalance },
      { where: { id: userId } }
    );

    if (updatedUser[0] > 0) {
      res.status(200).json({ message: "User balance updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user balance" });
  }
};
