import { Signer, utils } from "ethers";

export interface SignedMessage {
  signature: string;
  raw: string;
};

export interface RepoCreateMessageData {
  address: string;
  repoName: string;
  accessToken: string;
};

export interface UserCreateMessageData {
  accessToken: string;
};

export interface IssueCreateMessageData {
  transactionHash: string;
  issueId: string;
  repoAddress: string;
  description?: string;
};

export interface RequestReviewMessageData {
  repoAddress: string;
  issueId: string;
};

export interface IssueRejectMessageData {
  repoAddress: string;
  issueId: string;
};

export interface IssueResolveMessageData {
  repoAddress: string;
  issueId: string;
};

export interface ClaimExpiredTokensMessageData {
  repoAddress: string;
  issueId: string;
};

export interface TipMessageData {
  repoAddress: string;
  issueNumber: number;
  transactionHash: string;
};

export type MessageType = "RepoCreate" | "UserCreate" | "IssueCreate" | "RequestReview" | "IssueReject" | "IssueResolve" | "ClaimExpiredTokens" | "Tip";

export type MessageData = RepoCreateMessageData | UserCreateMessageData | IssueCreateMessageData | RequestReviewMessageData | IssueRejectMessageData | IssueResolveMessageData | ClaimExpiredTokensMessageData | TipMessageData;

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
  repoCreateMessage(data: RepoCreateMessageData){
    return this.signMessage({
      type: "RepoCreate",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }  
  userCreateMessage(data: UserCreateMessageData){
    return this.signMessage({
      type: "UserCreate",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  issueCreateMessage(data: IssueCreateMessageData){
    return this.signMessage({
      type: "IssueCreate",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  requestReviewMessage(data: RequestReviewMessageData){
    return this.signMessage({
      type: "RequestReview",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  issueRejectMessage(data: IssueRejectMessageData){
    return this.signMessage({
      type: "IssueReject",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  issueResolveMessage(data: IssueResolveMessageData){
    return this.signMessage({
      type: "IssueResolve",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  claimExpiredTokensMessage(data: ClaimExpiredTokensMessageData){
    return this.signMessage({
      type: "ClaimExpiredTokens",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }
  tipMessage(data: TipMessageData){
    return this.signMessage({
      type: "Tip",
      data: data,
      validUntil: Date.now() + 60*1000
    });
  }

  static verifyMessage<T extends MessageData>({ raw, signature }: SignedMessage){
    const address = utils.verifyMessage(Buffer.from(raw), signature);
    const message = <Message<T>>JSON.parse(raw);

    if(message.validUntil < Date.now()){
      throw new Error("Message expired");
    }
    return { address, message };
  }
}
