import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import userSchema, { IUser } from "../../models/user";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../../utils";

const router = Router();

router.post("/", async (req, res) => {
    try{
        const token = req.body.token

  if (!token)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", msg: "request body is wrong" });
    const user = decodeJWT(token)

  const data = await userSchema.findOne({ Email: user.email, Password: user.password });
  if (!data)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ status: "error", msg: "Email or Password is incorrect" });
    return res.status(StatusCodes.OK).send({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Email: data.Email
    })
        
    }catch(err){
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:'error', msg:'Error occured in the server'})
    }
});

export default router;
