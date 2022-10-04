import mongoose from "mongoose";
let connected = false;

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    const MONGO_URI: any = process.env.MONGO_URI;
    const connectionParams: any = {
      useNewUrlParser: false,
    };
    mongoose.connect(MONGO_URI, connectionParams);
    mongoose.connection.on("connected", () => {
      console.log("Connected to database sucessfully");
      connected = true;
      resolve(true);
    });

    mongoose.connection.on("error", (err: any) => {
      console.log("Error while connecting to database :" + err);
      reject();
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb connection disconnected");
    });
  });
};

export { dbConnect, connected };
