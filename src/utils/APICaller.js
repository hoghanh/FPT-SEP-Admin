import Axios from 'axios';
import { FPTSEP } from '../config';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjgsIm5hbWUiOiJDSEggVGVjaG5vbG9neSIsInBob25lIjoiMDg2NTY0NDE2MyIsImVtYWlsIjoiY2FvaGFuaDE3MTFAZ21haWwuY29tIiwiYWRkcmVzcyI6IjEyMyBMZSBWYW4gVmlldHR0dCAiLCJpbWFnZSI6Imh0dHBzOi8vZmlyZWJhc2VzdG9yYWdlLmdvb2dsZWFwaXMuY29tL3YwL2IvZnB0LXNlcC1mZS1lYjIyNy5hcHBzcG90LmNvbS9vL2ltYWdlcyUyRmF2YXRhcnMlMkZsb2dvLWNvbmctbmdoZSgzKS5qcGc_YWx0PW1lZGlhJnRva2VuPTQ3ZGU0ZDQ0LTcwOWUtNDc1NS1iNjhjLTgyYzYxYzQxMzRmMSIsInBhc3N3b3JkIjoiJDJiJDEwJGZ3eDlwMTAvTENBOGFJYkZGVUtpdk92enpmZlVaYVl0dzVFYkNnb2tHOWJSZ3FiOExHd2FpIiwicm9sZSI6ImNsaWVudCIsInN0YXR1cyI6dHJ1ZX0sImlhdCI6MTcwMDk5ODcxMywiZXhwIjoxNzAxMDAyMzEzfQ.SiqByLPWze6QuM0NhKTyDid4eh5HsY8OeXEsKsLRrkA`,
  };
};

export const request = (
  endpoint,
  method,
  headers = {},
  params = {},
  body = {}
) => {
  return Axios({
    url: FPTSEP + endpoint,
    method: method,
    headers: Object.assign(getHeaders(), headers),
    params: Object.assign(params),
    data: body,
  });
};

export const get = ({ endpoint, params = {}, headers = {} }) => {
  return request(endpoint, 'GET', headers, params);
};

export function post({ endpoint, body = {}, params = {}, headers = {} }) {
  return request(endpoint, 'POST', headers, params, body);
}

export const put = ({ endpoint, body = {}, params = {}, headers = {} }) => {
  return request(endpoint, 'PUT', headers, params, body);
};

export const remove = ({ endpoint, body = {}, params = {}, headers = {} }) => {
  return request(endpoint, 'DELETE', headers, params, body);
};
