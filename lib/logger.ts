import { QuestionPack } from "@prisma/client";

export default class DiscordLogger {
  public static async sendLog(message: string, _private: boolean = false) {
    const response = await fetch(process.env.WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
    console.log(await response.json());
  }


  public static createdQuestion(pack: QuestionPack) {
    const message = `🟡 Question pack created by <@${pack.authorId}> is pending approval!`;
    this.sendLog(message);
  }

  public static approvedQuestion(pack: QuestionPack, actionBy: string) {
    const message = `🟢 Question pack created by <@${pack.authorId}> was approved by <@${actionBy}>!`;
    this.sendLog(message);
  }

  public static deniedQuestion(pack: QuestionPack, actionBy: string) {
    const message = `🔴 Question pack created by <@${pack.authorId}> was denied by <@${actionBy}>!`;
    this.sendLog(message);
  }
}
 