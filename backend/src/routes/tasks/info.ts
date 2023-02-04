import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import taskSchema, { ITask } from "../../models/task";
import { decodeJWT } from "../../utils";

const router = Router();

router.post("/", async (req, res) => {
  const token = req.body.token;
  const user = decodeJWT(token);
  if (!token)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "The user token is wrong", status: "error" });

  const data = await taskSchema.findOne({ Email: user.email });

  return res.status(StatusCodes.OK).send(data ? data : {});
});

export default router;
