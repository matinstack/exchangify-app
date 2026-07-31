"use server";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { imageMetaSchema } from "@/schema/categories";
import { getSession } from "@/lib/auth-helpers";
import { AppError } from "@/lib/errors/AppError";

export async function getCategoryIconUploudUrl(meta: unknown) {
  const session = await getSession();
  if (!session?.user.id) throw new AppError("UNAUTHORIZED");

  const parsed = imageMetaSchema.safeParse(meta);
  if (!parsed.success) throw new Error("Unauthorized");

  const { fileName, fileSize, fileType } = parsed.data;
  const key = `category-icons/${session.user.id}/${crypto.randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.ARVAN_BUCKET!,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return { url, key };
}
