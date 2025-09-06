import mongoose, { Schema, Document, models, model } from 'mongoose'

export interface IUser extends Document {
	firstName: string
	lastName: string
	username: string
	email: string
	linkedin?: string
	github?: string
	bio?: string
	passwordHash: string
	createdAt: Date
	updatedAt: Date
}

const UserSchema = new Schema<IUser>({
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	username: { type: String, required: true, unique: true, trim: true, lowercase: true },
	email: { type: String, required: true, unique: true, trim: true, lowercase: true },
	linkedin: { type: String },
	github: { type: String },
	bio: { type: String },
	passwordHash: { type: String, required: true },
}, { timestamps: true })

// In dev with hot-reload, the previously compiled model may have an outdated schema.
// Delete and recompile to ensure we always use the latest schema.
if (mongoose.models.User) {
	delete mongoose.models.User
}

export default model<IUser>('User', UserSchema)
