import { BigNumber } from "ethers";
import { CID } from "multiformats/cid";
import { Blockstore, importer, UserImporterOptions } from "ipfs-unixfs-importer";
import { getReq } from "./fetch";

const defaultIPFSGateway = "http://localhost:8080";

export interface IssueData {
  id: BigNumber;
  creator: string;
  context: number[];
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
  contextCID: CID;

  private _contextRaw: number[];

  constructor(data: IssueData){
    this.id = data.id;
    this.creator = data.creator;
    this.tokens = data.tokens;
    this.expiresOn = data.expiresOn;

    this._contextRaw = data.context;
    this.contextCID = Issue.decodeCID(this._contextRaw);
  }

  async fetchContext(ipfsGateway?: string): Promise<IssueContext> {
    const cid = Issue.decodeCID(this._contextRaw);
    const context = <IssueContext>await getReq(`${ipfsGateway || defaultIPFSGateway}/ipfs/${cid}`);

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
      array[array.length - bytes.length + i] = bytes[i];
    }
    return array;
  }
  static decodeCID(encoded: number[]): CID {
    const bytes = new Uint8Array(64);
    let l = 0;

    for(let i = 0; i < encoded.length; ++i){
      if(encoded[i] == 0){
        continue;
      }
      bytes[l++] = encoded[i];
    }
    return CID.decode(bytes.slice(0, l));
  }
};
