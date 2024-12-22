import { Document, Schema, model, models } from 'mongoose'

export interface IGuild extends Document {
	guildID: string
	language: string
	premium: number
	premiumExpiration: Date
	premiumUser: string
}

const guildProfileSchema: Schema = new Schema(
	{
		guildID: {
			type: String,
			required: true,
			unique: true
		},
		language: {
			type: String,
			default: 'en_EN',
			required: true
		},
		premium: {
			type: Number,
			default: 0
		},
		premiumExpiration: {
			type: Date,
			default: null
		},
		premiumUser: {
			type: String
		}
	},
	{ timestamps: true }
)

export default models.Guild || model('guildProfile', guildProfileSchema)
