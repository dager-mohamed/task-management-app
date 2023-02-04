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
  const name = req.body.name;
  const priority: "normal" | "urgent" | "important" | "completed" =
    req.body.priority;
  const id = req.body.id;
  // 'normal' | 'urgent' | 'important' | 'completed'

  const priorities = ["normal", "urgent", "important", "completed"];
  if (!priorities.includes(priority)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "The priority is not valid" });
  }
  if (!name || !id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ msg: "There are missing fields", status: "error" });

  const check_data = await taskSchema.findOne({ Email: user.email });
  const filter_tasks = check_data?.Tasks.filter((task) => task.TaskId == id)[0];
  if (filter_tasks)
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ msg: "The task id already exists" });

  if (check_data) {
    await taskSchema.findOneAndUpdate(
      {
        Email: user.email,
      },
      {
        "$push":{Tasks:{
          Name: name,
          Priority: priority,
          TaskId: id,
        }}
      },
      { upsert: true }
    );
  } else {
    await taskSchema.findOneAndUpdate(
      {
        Email: user.email,
      },
      {
        Email: user.email,
        Tasks: [
          {
            Name: name,
            Priority: priority,
            TaskId: id,
          },
        ],
      },
      { upsert: true }
    );
  }

  return res
    .status(StatusCodes.OK)
    .send({ msg: "The task has been created", status: "ok" });
});

export default router;
