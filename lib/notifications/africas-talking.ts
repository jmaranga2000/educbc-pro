type SmsPayload = {
  to: string[];
  message: string;
};

export async function sendSms({ to, message }: SmsPayload) {
  if (!process.env.AFRICASTALKING_API_KEY || !process.env.AFRICASTALKING_USERNAME) {
    throw new Error("Africa's Talking credentials are not configured.");
  }

  return {
    provider: "africas-talking",
    queued: to.length,
    message
  };
}
