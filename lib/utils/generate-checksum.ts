import crypto from "crypto";


export function generateChecksum(url: string): string {
  // Use a secure secret key stored in environment variables
  const secret = process.env.NEXT_PRIVATE_VERIFICATION_SECRET || process.env.NEXTAUTH_SECRET;
  
  if (!secret) {
    console.error("Missing NEXT_PRIVATE_VERIFICATION_SECRET environment variable");
    // Return a fallback or throw a more descriptive error
    return "invalid-checksum";
  }

  // Create HMAC using SHA-256
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(url);

  // Return hex digest
  return hmac.digest("hex");
}