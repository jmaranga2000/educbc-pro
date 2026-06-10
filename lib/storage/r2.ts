import { S3Client } from "@aws-sdk/client-s3";

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;

  if (!accountId || !process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
    throw new Error("Cloudflare R2 credentials are not configured.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
    }
  });
}
