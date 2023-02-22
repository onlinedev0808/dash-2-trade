import * as crypto from "node:crypto";

export function SHA256(string) {
  return crypto.createHash("sha256").update(string).digest("base64").toString();
}
