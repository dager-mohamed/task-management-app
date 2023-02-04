import mongoose from "mongoose";

export interface ITask {
  Tasks: {
    Name: string;
    Priority: "normal" | "urgent" | "important" | "completed";
    TaskId: string;
  }[];
  Email: string;
}

const Schema = new mongoose.Schema<ITask>({
  Tasks: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITask>("tasks", Schema);