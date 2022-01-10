import { BigNumber } from "ethers";
import { CID } from "multiformats/cid";
import fetch from "isomorphic-unfetch";
import { Blockstore, importer, UserImporterOptions } from "ipfs-unixfs-importer";

const defaultIPFSGateway = "http://localhost:8000";

export interface IssueData {
  id: BigNumber;
  creator: string;
  context: BigNumber[];
  tokens: BigNumber;
  expiresOn: BigNumber;
};

export interface IssueContext {
  issueNumber: number;
  description: string;
};

export enum EventTopics {
  ISSUE_CREATE = "0xcef462308b17e05167520aa634b204f93801babe44e50cbc093715311c26f301",
  ISSUE_RESOLVE = "0x008e69eb2bd87be102869487aea6ba9b448bea880cbef7f9918b8e910f908d63",
  ISSUE_REJECT = "0x37f0ffea363f56b8909317ad9575fe4af24f80a8ade7a4ea494865765323498c",
  ISSUE_EXPIRE = "0xf951cddb2c86902cc5a4fe6a0ce832ff6e93e430e055973aefb5354c01784d27"
};

export default class Issue {
  id: BigNumber;
  creator: string;
  tokens: BigNumber;
  expiresOn: BigNumber;

  context?: IssueContext;
  contextCID?: CID;

  private _contextRaw: BigNumber[];

  constructor(data: IssueData){
    this.id = data.id;
    this.creator = data.creator;
    this.tokens = data.tokens;
    this.expiresOn = data.expiresOn;
    this._contextRaw = data.context;
  }

  async fetchContext(ipfsGateway?: string): Promise<IssueContext> {
    const cid = CID.parse(this._contextRaw.toString());
    const res = await fetch(`${ipfsGateway || defaultIPFSGateway}/ipfs/${cid.toString()}`);

    const context = <IssueContext>await res.json();

    this.context = context;
    this.contextCID = cid;

    return context;
  }

  static async genCID(context: IssueContext, options?: UserImporterOptions): Promise<CID> {
    // @ts-ignore
    const block: Blockstore = {
      get: async (cid: CID) => { throw new Error(`unexpected block API get for ${cid}`) },
      put: async () => { throw new Error('unexpected block API put') }
    };

    options = options || {};
    options.onlyHash = true;
    options.cidVersion = 1;
  
    const content = new TextEncoder().encode(JSON.stringify(context));
    
    let lastCid: CID | undefined;

    for await (const { cid } of importer([{ content }], block, options)) {
      lastCid = cid;
    }
    return lastCid!;
  }
  static encodeCID(cid: CID): number[] {
    const bytes = cid.bytes;
    const array: number[] = new Array(64);

    array.fill(0);

    for(let i = bytes.byteLength - 1; i >= 0; i--){
      array[i] = bytes[i];
    }
    return array;
  }
};
