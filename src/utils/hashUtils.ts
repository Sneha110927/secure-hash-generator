import bcrypt from "bcryptjs";

export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512" | "bcrypt";

const toHex = (buffer: ArrayBuffer) =>
  [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");

export async function generateHash(text: string, algorithm: HashAlgorithm) {
  if (!text.trim()) return "";

  if (algorithm === "bcrypt") {
    return bcrypt.hashSync(text, 10);
  }

  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest(algorithm, data);
  return toHex(digest);
}

export async function generateFileHash(file: File, algorithm: Exclude<HashAlgorithm, "bcrypt">) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest(algorithm, buffer);
  return toHex(digest);
}