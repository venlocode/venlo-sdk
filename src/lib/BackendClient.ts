import HttpClient from "./HttpClient";

export default class BackendClient extends HttpClient {
  constructor(url: string) {
    super(url);
  }
  createRepo(githubId: string, addr: string, accessToken: string){
    return this._getReq(`repos/create?githubId=${githubId}&addr=${addr}&accessToken=${accessToken}`);
  }
  createUser(addr: string, accessToken: string) {
    return this._getReq(`users/create?addr=${addr}&accessToken=${accessToken}`);
  }
}
