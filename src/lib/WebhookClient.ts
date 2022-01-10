import { BigNumber } from "ethers";
import { CID } from "multiformats";
import HttpClient from "./HttpClient";
import { SignedMessage } from "./MessageClient";

export default class WebhookClient extends HttpClient {
  constructor(url: string){
    super(url);
  }
  pinContext(repoAddress: string, issueId: BigNumber, cid: CID){
    return this._getReq(`api/repos/${repoAddress}/issues/${issueId.toString()}/pin/${cid.toString()}`);
  }
  createIssue(message: SignedMessage){
    return this._postReq("api/issues/new", message);
  }
  requestReview(message: SignedMessage){
    return this._postReq("api/issues/requestReview", message);
  }
  rejectIssue(message: SignedMessage){
    return this._postReq("api/issues/reject", message);
  }
  resolveIssue(message: SignedMessage){
    return this._postReq("api/issues/resolve", message);
  }
  claimExpiredTokens(message: SignedMessage){
    return this._postReq("api/issues/claimExpired", message);
  }
  tip(message: SignedMessage){
    return this._postReq("api/issues/tip", message);
  }
  refreshIssue(repoAddress: string, issueId: string){
    return this._getReq(`api/${repoAddress}/${issueId}/refresh`);
  }
}
