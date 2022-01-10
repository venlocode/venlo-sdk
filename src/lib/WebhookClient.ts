import { BigNumber } from "ethers";
import { CID } from "multiformats";
import { IssueContext } from "..";
import HttpClient from "./HttpClient";
import { SignedMessage } from "./MessageClient";

export default class WebhookClient extends HttpClient {
  constructor(url: string){
    super(url);
  }
  createIssue(repoAddress: string, issueId: BigNumber, context: IssueContext, transactionHash: string){
    return this._postReq(`repos/${repoAddress}/issues/${issueId.toString()}/create/${transactionHash}`, { context });
  }
  resolveIssue(repoAddress: string, issueId: BigNumber, transactionHash: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/resolve/${transactionHash}`);
  }
  rejectIssue(repoAddress: string, issueId: BigNumber, transactionHash: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/reject/${transactionHash}`);
  }
  claimExpired(repoAddress: string, issueId: BigNumber, transactionHash: string){
    return this._getReq(`repos/${repoAddress}/issues/${issueId.toString()}/expire/${transactionHash}`);
  }
  refreshIssue(repoAddress: string, issueId: string){
    return this._getReq(`api/${repoAddress}/${issueId}/refresh`);
  }

  // need to update these two
  requestReview(message: SignedMessage){
    return this._postReq("api/issues/requestReview", message);
  }
  tip(message: SignedMessage){
    return this._postReq("api/issues/tip", message);
  }
}
