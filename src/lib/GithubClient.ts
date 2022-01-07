import { Endpoints } from "@octokit/types";
import HttpClient, { AuthConfig } from "./HttpClient";

export default class GithubClient extends HttpClient {
  constructor(auth?: AuthConfig){
    super("https://api.github.com/", auth);
  }

  getUser(): Promise<Endpoints["GET /user"]["response"]["data"]>{
    return this._getReq(`user`);
  }
  getUserFromId(id: string): Promise<Endpoints["GET /user"]["response"]["data"]>{
    return this._getReq(`user/${id}`);
  }
  getUserFromName(username: string): Promise<Endpoints["GET /users/{username}"]["response"]["data"]>{
    return this._getReq(`users/${username}`);
  }
  getRepoFromName(repoName: string): Promise<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]>{
    return this._getReq(`repos/${repoName}`);
  }
  getRepoFromId(repoId: string): Promise<Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]>{
    return this._getReq(`repositories/${repoId}`);
  }
  getOrgOwners(orgName: string): Promise<Endpoints["GET /orgs/{org}/members"]["response"]["data"]>{
    return this._getReq(`orgs/${orgName}/members?role=admin`);
  }
  getInstallations(repoId: string): Promise<Endpoints["GET /repos/{owner}/{repo}/installation"]>{
    return this._getReq(`repositories/${repoId}/installations`);
  }

  async readAddressFromBio(username: string): Promise<string> {
    const user = await this.getUserFromName(username);
    const bio = String(user.bio || "");
  
    const startIndex = bio.indexOf("|");
    const address = bio.substring(startIndex == -1 ? 0 : startIndex, bio.length-1);
  
    return address;
  }
  async getRepoOwners(repoName: string): Promise<Array<Endpoints["GET /users/{username}"]["response"]["data"]>>{
    const repo = await this.getRepoFromName(repoName);
  
    if(repo.owner.type == "User") {
      return [repo.owner];
    }
    return await this.getOrgOwners(repo.owner.login);
  }
}
