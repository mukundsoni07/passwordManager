import { Password } from "../models/passwordModel.js";
import encrypt from '../utils/encrypt.js';
import decrypt from '../utils/decrypt.js';


export const addPassword = async (req, res) => {
  const { platform, username, password } = req.body;

  if (!platform || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { iv, encryptedData } = encrypt(password);

    const newPassword = await Password.create({
      platform,
      username,
      password: encryptedData,
      iv,
      userId: req.user._id,
    });

    res.status(201).json({ message: "Password saved successfully", password: newPassword });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error saving password", error: error.message });
  }
};


export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user._id });

    if (passwords.length === 0) {
      return res.status(404).json({ message: "No passwords found" });
    }


    const decryptedPasswords = passwords.map(password => {
      const decryptedPassword = decrypt(password.password, password.iv);

      return {
        _id: password._id,
        platform: password.platform,
        username: password.username,
        password: decryptedPassword,
        userId: password.userId,
        createdAt: password.createdAt,
        updatedAt: password.updatedAt
      };
    });

    res.json(decryptedPasswords);

  } catch (error) {
    res.status(500).json({ message: "Error fetching passwords", error: error.message });
  }
};


export const deletePassword = async (req, res) => {
  try {
    const deletedPassword = await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found or not authorized" });
    }

    res.json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting password", error: error.message });
  }
};


export const editPassword = async (req, res) => {
  const { platform, username, password } = req.body;

  if (!platform || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { platform, username, password },
      { new: true, runValidators: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found or not authorized" });
    }

    res.json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};
