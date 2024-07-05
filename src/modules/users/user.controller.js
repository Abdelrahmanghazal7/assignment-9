import userModel from "../../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../service/sendEmail.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import { AppError } from "../../utils/classError.js";

// =========================================== REGISTRATION ===========================================

const registration = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(new AppError("user already exist", 400));
  }

  const token = jwt.sign({ email }, "confirmed");
  const link = `http://localhost:3000/users/confirmEmail/${token}`;

  const checkSendEmail = await sendEmail(
    email,
    "hi",
    `<a href=${link}>Confirm Email</a>`
  );
  if (!checkSendEmail) {
    return next(new AppError("email not send", 400));
  }

  const hash = bcrypt.hashSync(password, 8);
  const user = await userModel.create({ name, email, password: hash });

  res.status(200).json({ msg: "done", user });
};

export const signUp = asyncHandler(registration);

// =========================================== CONFIRM EMAIL ===========================================

const confirm = async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, "confirmed");
  if (!decoded?.email) {
    return next(new AppError("invalid payload", 400));
  }
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmed: false },
    { confirmed: true },
    { new: true }
  );
  if (!user) {
    return next(new AppError("user not found or already confirmed", 400));
  }
  res.status(200).json({ msg: "done", user });
};

export const confirmEmail = asyncHandler(confirm);

// =========================================== LOGIN ===========================================

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, confirmed: true });

  if (!user) {
    return next(new AppError("invaild email or email not confirmed", 409));
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return next(new AppError("password incorrect", 400));
  }

  const token = jwt.sign({ name: user.name, email }, "ghazal", {
    expiresIn: "1d",
  });
  res.status(200).json({ msg: "done", token });
};

export const signIn = asyncHandler(login);

// =========================================== GET PROFILE ===========================================

const profile = async (req, res, next) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.status(200).json({ msg: "done", user });
};

export const getProfile = asyncHandler(profile);
