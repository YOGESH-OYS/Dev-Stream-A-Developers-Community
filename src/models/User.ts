import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
	firstName: string
	lastName: string
	username: string
	email: string
	passwordHash: string
	linkedin?: string
	github?: string
	bio?: string
	firstLoginAt?: Date
	chats?:string[]
	createdAt: Date
	updatedAt: Date
}

try { mongoose.deleteModel('User') } catch {}

const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	linkedin: { type: String },
	github: { type: String },
	bio: { type: String },
	firstLoginAt: { type: Date, default: null },
	chats :{type:[String], default:[]}
}, { timestamps: true })

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)
export default User
