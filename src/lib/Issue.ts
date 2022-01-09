import { BigNumber } from "ethers";
import { CID, IPFSHTTPClient } from "ipfs-http-client";

export interface IssueData {
  id: string;
  creator: string;
  expiresOn: number;
  tokens: BigNumber;
  context: Uint8Array;
};

export interface IssueContext {
  issueNumber: number;
  description: string;
};

export default class Issue {
  id: string;
  creator: string;
  tokens: BigNumber;
  expiresOn: number;
  context?: IssueContext;
  contextCID?: CID;

  private _contextRaw: Uint8Array;

  constructor(data: IssueData){
    this.id = data.id;
    this.creator = data.creator;
    this.tokens = data.tokens;
    this.expiresOn = data.expiresOn;
    this._contextRaw = data.context;
  }

  async fetchContext(ipfsClient: IPFSHTTPClient): Promise<IssueContext> {
    const cid = CID.parse(this._contextRaw.toString());
    const iter = await ipfsClient.get(cid);

    let data: string = "";

    for await(const chunk of iter){
      data += chunk.toString();
    }
    const context = <IssueContext>JSON.parse(data!.toString());

    this.context = context;
    this.contextCID = cid;

    return context;
  }
};
