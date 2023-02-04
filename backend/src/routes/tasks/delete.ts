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
  const id = req.body.id;

    if(!id) return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "There are missing fields", status: "error" });

  const check_data = await taskSchema.findOne({ Email: user.email });
  const filter_tasks = check_data?.Tasks.filter((task) => task.TaskId == id)[0];

  if (filter_tasks) {
    await taskSchema.findOneAndUpdate(
      {
        Email: user.email,
      },
      {
        "$pull":{Tasks:{
          TaskId: id,
        }}
      },
      { upsert: true }
    );
  } else {
     return res.status(StatusCodes.BAD_GATEWAY).send({status:'error', msg:"The task can not be found"})
  }

  return res
    .status(StatusCodes.OK)
    .send({ msg: "The task has been deleted", status: "ok" });
});

export default router;
