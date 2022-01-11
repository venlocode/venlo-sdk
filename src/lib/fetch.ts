import fetch from "isomorphic-unfetch";

const _getReq = async (url: string, headers?: HeadersInit) => {
  const res = await fetch(url, { headers, redirect: "manual" });

  if(res.status != 200) {
    const err = await res.text();
    throw new Error(`Failed to fetch ${url}: ${res.status} ${err}`);
  }
  return res.json();
};

const _postReq = async (url: string, data: Object = {}, headers: any = {}) => {
  const res = await fetch(url, { 
    method: "POST",
    headers: { "Content-type": "application/json", ...headers },
    body: JSON.stringify(data),
  });

  if(res.status != 200) {
    const err = await res.text();
    throw new Error(`Failed to fetch ${url}: ${res.status} ${err}`);
  }
  return res.json();
};

// @ts-ignore
export const getReq = globalThis.__getReq || _getReq;
// @ts-ignore
export const postReq = globalThis.__postReq || _postReq;
