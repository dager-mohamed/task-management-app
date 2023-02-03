import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import userSchema, { IUser } from "../../models/user";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
  const body: IUser = req.body;

  const firstName = body.FirstName;
  const lastName = body.LastName;
  const email = body.Email;
  const password = body.Password;

  if (!firstName || !lastName || !email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", msg: "request body is wrong" });
  const data = await userSchema.findOne({ Email: email });
  if (data)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ status: "error", msg: "User already exists" });

  new userSchema({
    Email: email,
    FirstName: firstName,
    LastName: lastName,
    Password: password,
  })
    .save()
    .then(async () => {
      const token = jwt.sign(
        {
          email,
          lastName,
          firstName,
        },
        process.env.JWT_SECRET
      );
      return res
        .status(StatusCodes.ACCEPTED)
        .send({ status: "OK", msg: "user has been created", token });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: "error", msg: "Error occured in the server" });
    });
});

export default router;
