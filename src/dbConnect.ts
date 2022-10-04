import mongoose from "mongoose";

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    const MONGO_URI: any = process.env.MONGO_URI;
    console.log({ MONGO_URI });
    const connectionParams: any = {
      useNewUrlParser: false,
    };
    console.log("Goose 0");
    mongoose.connect(MONGO_URI, connectionParams);
    console.log("Goose 1");
    mongoose.connection.on("connected", () => {
      console.log("Connected to database sucessfully");
      resolve(true);
    });
    console.log("Goose 2");

    mongoose.connection.on("error", (err: any) => {
      console.log("Error while connecting to database :" + err);
      reject();
    });
    console.log("Goose 3");

    mongoose.connection.on("disconnected", () => {
      console.log("Mongodb connection disconnected");
    });
    console.log("Goose 4");

    console.log("Connected");
  });
};

export { dbConnect };
