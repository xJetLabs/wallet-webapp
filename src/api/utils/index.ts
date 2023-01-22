import nacl from "tweetnacl";

export const sign_message = async (message: any, private_key: any) => {
  if (isNaN(Number(private_key))) {
    return;
  }

  if (!message.query_id) {
    message.query_id = (Math.floor(Date.now() / 1000) + 60) << 16;
  }
  message.signature = nacl.sign(message, private_key);
  return message;
};
