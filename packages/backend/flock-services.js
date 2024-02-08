import mongoose from "mongoose";
import flockModel from "./flock.js";

mongoose.connect("mongodb://___MONGO_DB_URI___", {}).catch((error) => console.error(error));

function getFlockByCode(code) {
	return flockModel.findOne({ coop_name: code });
}

export { getFlockByCode };
