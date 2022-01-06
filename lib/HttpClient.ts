import fetch from "isomorphic-unfetch";

export default class HttpClient {
  url: string;
  accessToken?: string;

  constructor(url: string, accessToken?: string){
    this.url = url;
    this.accessToken = accessToken;
  }

  async _getReq(endpoint: string){
    const uri = `${this.url}/${endpoint}`;;
    const res = await fetch(uri, this.accessToken ? { headers: { Authorization: `token ${this.accessToken}` } } : undefined);
    
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
