import mongoose from "mongoose";

export const getMongoDBConnectiton = () => {
	mongoose.set("strictQuery", true);
	mongoose.connect(
		`${process.env["MONGODB_CONNECTION_STRING"]}${process.env["DATABASE_NAME"]}`
	);

	const db = mongoose.connection;
	db.on("error", (err) => {
		console.log(err);
	});
	db.once("open", () => {
		console.log("connected to database");
	});
};