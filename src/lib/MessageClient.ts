import { Signer, utils } from "ethers";

export interface SignedMessage {
  signature: string;
  raw: string;
};

export interface RequestReviewMessageData {
  repoAddress: string;
  issueId: string;
};

export type MessageType = "RequestReview";

export type MessageData = RequestReviewMessageData

export interface Message<T extends MessageData> {
  type: MessageType;
  data: T;
  validUntil: Number;
};

export default class MessageClient {
  signer?: Signer;

  constructor(signer?: Signer){
    this.signer = signer;
  }
  setSigner(signer: Signer){
    this.signer = signer;
  }
  async signMessage<T extends MessageData>(message: Message<T>): Promise<SignedMessage> {
    const raw = JSON.stringify(message);
    return { signature: await this.signer!.signMessage(raw), raw };
  }
  requestReviewMessage(data: RequestReviewMessageData){
    return this.signMessage({
      type: "RequestReview",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }

  static verifyMessage<T extends MessageData>({ raw, signature }: SignedMessage, type?: MessageType): { address: string, message: Message<T> } {
    const address = utils.verifyMessage(Buffer.from(raw), signature);
    const message = <Message<T>>JSON.parse(raw);

    if(message.validUntil < Date.now()){
      throw new Error("Message expired");
    }
    if(type && type != message.type){
      throw new Error("Message type mismatch");
    }
    return { address, message };
  }
}
