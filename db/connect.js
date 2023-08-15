import mongoose from "mongoose";

const Connect = async (mongoURI) => {
  try {
    await mongoose.connect("mongodb+srv://brajesh:ywnRP5cdZ95kippP@nodeexpressprojects.yy75c.mongodb.net/SMS?retryWrites=true&w=majority");
    console.log("connected");
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export { Connect };
