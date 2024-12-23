import { QuestionPack } from '@prisma/client';

export default class DiscordLogger {
	public static async sendLog(message: string, embed?: Record<string, unknown>) {
		const payload: Record<string, unknown> = { content: message };
		if (embed) {
			payload.embeds = [embed];
		}

		const response = await fetch(process.env.WEBHOOK_URL!, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		});
		console.log(await response.json());
	}

	public static createdQuestion(pack: QuestionPack) {
		const message = `🟡 Question pack created by <@${pack.authorId}> is pending approval!`;
		this.sendLog(message);
	}

	public static approvedQuestion(pack: QuestionPack, actionBy: string, staffMessage?: string) {
		const message = `🟢 Question pack created by <@${pack.authorId}> was approved by <@${actionBy}>!`;
		const embed = staffMessage
			? {
					title: 'Staff Message',
					description: `> ${staffMessage}`,
					color: 0x00ff00
			  }
			: undefined;

		this.sendLog(message, embed);
	}

	public static deniedQuestion(pack: QuestionPack, actionBy: string, staffMessage?: string) {
		const message = `🔴 Question pack created by <@${pack.authorId}> was denied by <@${actionBy}>!`;
		const embed = staffMessage
			? {
					title: 'Staff Message',
					description: `> ${staffMessage}`,
					color: 0xff0000
			  }
			: undefined;

		this.sendLog(message, embed);
	}
}
