import mongoose from "mongoose";

export async function connectMongoose(url: string) {
    mongoose.set('strictQuery', false)
  await mongoose
    .connect(url)
    .then(() => console.log("[MONGOOSE] Connected"))
    .catch((err) => {
      console.log("[MONGOOSE] Error");
      console.log(err);
    });
}
