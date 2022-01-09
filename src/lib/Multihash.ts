import { BigNumber } from "ethers";
import { CID } from "ipfs-http-client";

export interface Multihash {
  digest: Uint8Array;
  code: BigNumber;
  size: BigNumber;
};

export const getMultihashFromCID = (cid: CID | string): Multihash => {
  if(typeof cid == "string"){
    cid = CID.parse(cid);
  }
  return {
    digest: cid.multihash.digest,
    code: BigNumber.from(cid.multihash.code),
    size: BigNumber.from(cid.multihash.size),
  };
};

export const getCIDFromMultihash = (multihash: Multihash): CID => {
  const code = multihash.code.toNumber();
  const size = multihash.size.toNumber();
  const digest = multihash.digest;

  const bytes = new Uint8Array(multihash.digest.length + 2);
  
  bytes[0] = code;
  bytes[1] = size;

  bytes.set(multihash.digest, 2);

  return new CID(1, code, { code, size, digest, bytes }, bytes);
};
