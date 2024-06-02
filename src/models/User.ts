import mongoose, { Schema, Document, Model } from "mongoose";
import { z } from "zod";

// Define Zod schema
const UserSchema = z.object({
	name: z.string().nonempty(),
	email: z.string().email(),
	password: z.string().min(6),
	tokenId: z.string() // Adjust minimum password length as needed
});

export type IUser = z.infer<typeof UserSchema>;

// Define Mongoose schema
const mongooseUserSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	tokenId:{ type:String, require:false}
});

/// Validate user data against Zod schema before saving
mongooseUserSchema.pre<IUser>("save", async function (next) {
	try {
		// Extract user data from the Mongoose document
		const { name, email, password, tokenId } = this;

		// Validate user data
		UserSchema.parse({ name, email, password, tokenId });
		next(); // Proceed with saving if validation passes
	} catch (error:any) {
		next(error); // Pass validation error to the next middleware
	}
});

// Define and export Mongoose model
const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>("User", mongooseUserSchema);

export default User;
