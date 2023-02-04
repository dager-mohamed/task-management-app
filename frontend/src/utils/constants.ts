export interface RespBackend {
  msg: string;
  status: string;
  token?: string;
}
export interface ITask {
    Tasks: {
      Name: string;
      Priority: "normal" | "urgent" | "important" | "completed";
      TaskId: string;
    }[];
    Email: string;
  }
export interface IUser {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}
