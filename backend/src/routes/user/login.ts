import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import userSchema, { IUser } from "../../models/user";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req, res) => {
    try{
  const body: IUser = req.body;
  console.log(body)
  const email = body.Email;
  const password = body.Password;

  if (!email || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", msg: "request body is wrong" });
  const data = await userSchema.findOne({ Email: email, Password: password });
  if (!data)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ status: "error", msg: "Email or Password is incorrect" });
    
    const token = jwt.sign({
        email,
        password,
        firstName: data.FirstName,
        lastName: data.LastName
    }, process.env.JWT_SECRET)
    return res.status(StatusCodes.OK).send({status:'OK', msg:'user is true!', token})
        
    }catch(err){
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({status:'error', msg:'Error occured in the server'})
    }
});

export default router;
