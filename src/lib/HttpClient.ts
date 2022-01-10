import fetch from "isomorphic-unfetch";
import { getReq, postReq } from "./fetch";

export interface AuthConfig {
  accessToken: string;
  type: string;
};

export default class HttpClient {
  url: string;
  auth?: AuthConfig;

  constructor(url: string, auth?: AuthConfig){
    this.url = url;
    this.auth = auth;
  }
  setAuth(auth: AuthConfig){
    this.auth = auth;
  }

  _getReq(endpoint: string){
    return getReq(`${this.url}/${endpoint}`, this.auth && { Authorization: `${this.auth.type} ${this.auth.accessToken}` });
  }
  async _postReq(endpoint: string, data: Object = {}){
    return postReq(`${this.url}/${endpoint}`, data);
  }
}
