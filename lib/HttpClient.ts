import fetch from "isomorphic-unfetch";

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

  async _getReq(endpoint: string){
    const uri = `${this.url}/${endpoint}`;;
    const res = await fetch(uri, this.auth ? { headers: { Authorization: `${this.auth.type} ${this.auth.accessToken}` } } : undefined);
    
    if(res.status != 200) {
      const err = await res.text();
      throw new Error(`Failed to fetch ${uri}: ${res.status} ${err}`);
    }
    return res.json();
  }
  async _postReq(endpoint: string, data: Object = {}){
    const uri = `${this.url}/${endpoint}`;

    const res = await fetch(uri, { 
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if(res.status != 200) {
      const err = await res.text();
      throw new Error(`Failed to fetch ${uri}: ${res.status} ${err}`);
    }
    return res.json();
  }
}
