import HttpClient from "./HttpClient";
import { SignedMessage } from "./MessageClient";

export interface Repository {
  address: string,
  githubId: string
};

export interface User {
  address: string,
  githubId: string
};

export default class BackendClient extends HttpClient {
  constructor(url: string) {
    super(url);
  }

  getRepoFromId(repoId: string): Promise<Repository> {
    return this._getReq(`repos/${repoId}`);
  }
  getRepoFromAddress(address: string): Promise<Repository> {
    return this._getReq(`repos?address=${address}`);
  }
  getUserFromId(id: string | number): Promise<User> {
    return this._getReq(`users/${id}`);
  }
  getUserFromAddress(address: string): Promise<User> {
    return this._getReq(`users?address=${address}`);
  }

  createRepo(message: SignedMessage) {
    return this._postReq(`repos/create`, message);
  }
  createUser(message: SignedMessage) {
    return this._postReq(`users/create`, message);
  }
}
