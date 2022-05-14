import HttpClient from "./HttpClient";
import { IssueContext } from "..";
import { SignedMessage } from "./MessageClient";

export default class WebhookClient extends HttpClient {
  constructor(url: string){
    super(url);
  }
  createIssue(repoAddress: string, issueId: string, context: IssueContext){
    return this._postReq(`repos/${repoAddress}/issues/${issueId.toString()}/create`, { context });
  }
  resolveIssue(repoAddress: string, issueId: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/resolve`);
  }
  rejectIssue(repoAddress: string, issueId: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/reject`);
  }
  claimExpired(repoAddress: string, issueId: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/expire`);
  }
  tip(repoAddress: string, transactionHash: string, issueNumber: number | string){
    return this._getReq(`repos/${repoAddress}/tip/${transactionHash}?issueNumber=${issueNumber}`);
  }
  refreshIssue(repoAddress: string, issueId: string){
    return this._getReq(`api/${repoAddress}/${issueId}/refresh`);
  }
  // need to update this
  requestReview(message: SignedMessage){
    return this._postReq("issues/requestReview", message);
  }
}
