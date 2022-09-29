import mongoose from "mongoose";

const Schema = mongoose.Schema;
const recipes = new Schema({}, { strict: false });
const Recipes = mongoose.model("recipes", recipes);

export { Recipes };
