import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import nodemailer from "nodemailer";
import UserToken from "../models/UserToken.js";

export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.userName,
    email: req.body.email,
    password: hashPassword,
    roles: role,
  });
  await newUser.save();
  return res.status(200).json("User Register Sucessfully");
};

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    isAdmin: true,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "Admin Register Sucessfully"));
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );
    const { roles } = user;
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Username or Password incorrect");
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        roles: roles,
      },
      process.env.Jwt_SECRET
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ status: 200, message: "Login sucess", data: user });
    // return next(CreateSuccess(200, "Login Sucessfully!"));
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
};

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });
  if (!user) {
    return next(CreateError(404, "User not found to rest the email!"));
  }
  const payload = {
    email: user.email,
  };
  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.Jwt_SECRET, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user._id,
    token: token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ghostthepunisher3194@gmail.com",
      pass: "npimbymlatnfyvkm",
    },
  });
  let mailDetails = {
    from: "ghostthepunisher3194@gmail.com",
    to: email,
    subject: "Reset Password!",
    html: `
    <html>
    <head>
    <title>Password Reset Request</title>
    </head>
    <body>
    <p>Dear ${user.username},</p>
    <p>we have recieved a request to reset your password for your account with PropertyPlus.To Complete the password reset process, please click on the button below :</p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4cAF50; color: white;  padding: 14px 20px; border:none; cursor:pointer; border-radius: 4px;">Reset Password</button></a> 
    <p>please note that this link is only valid for a 5 minutes.If you did not request  a password reset, please disregard this message </p>
    <p>Thank you </p>
   
    </body>
    </html>
    `,
  };
    mailTransporter.sendMail(mailDetails, async(err, data)=>{
      if(err){
        console.log(err); 
        return next(CreateError(500, "Something went wrong while sending the email "))
        
      }else{
        await newToken.save();
        return next(CreateSuccess(200), "Email-send Successfully")
      }

    })
};
