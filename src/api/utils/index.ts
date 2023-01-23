import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

function strToBuffer(string: string) {
  let arrayBuffer = new ArrayBuffer(string.length * 1);
  let newUint = new Uint8Array(arrayBuffer);
  newUint.forEach((_, i) => {
    newUint[i] = string.charCodeAt(i);
  });
  return newUint;
}

function toHexString(byteArray: any) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

function fromHexString(hexString: string) {
  // @ts-ignore
  return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

export const sign_message = async (message: any, private_key: any) => {
  if (!private_key) {
    return;
  }

  if (!message.query_id) {
    message.query_id = Math.trunc(Date.now() / 1000 + 60) * 65536;
  }

  let keyPair = nacl.sign.keyPair.fromSeed(fromHexString(private_key));
  private_key = keyPair.secretKey;

  let cleanMessage = JSON.stringify(message).replace(/\\n/g, "");

  message.signature = nacl.sign.detached(
    new TextEncoder().encode(cleanMessage),
    private_key
  );

  message.signature = toHexString(message.signature);
  return message;
};
