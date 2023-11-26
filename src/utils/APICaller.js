import Axios from 'axios';
import { FPTSEP } from '../config';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjM2LCJuYW1lIjoiVnUgRHVjIEFuaCAoSzE2X0hDTSkiLCJwaG9uZSI6IiIsImVtYWlsIjoiYW5odmRzZTE2MTQxMEBmcHQuZWR1LnZuIiwiYWRkcmVzcyI6IiIsImltYWdlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmdOdTBoTjJ5Uy0wcnFEMkQ1cmtJWFhndkRlM1JQdkZrN0x1cmNpcjZyUUVJPXM5Ni1jIiwicGFzc3dvcmQiOiIkMmIkMTAkWi9JUUxuVHhsS2x3R2JjTjVwVE8zdVR3b0tZSk16M1QwMXFhV1VOb1BzdDJQMzF5ZlF5NnkiLCJyb2xlIjoiZnJlZWxhbmNlciIsInN0YXR1cyI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wOS0xMlQwMjo1Mjo0Mi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0xMlQwMjo1Mjo0Mi4wMDBaIn0sImlhdCI6MTcwMTAwMzI1MCwiZXhwIjoxNzAxMDA2ODUwfQ.TJUz4a6dbnP4-CdEZyK4z5JYoy9lm1Ks6x0BrzJyRgY`,
    // Authorization: `Bearer ${LocalStorageUtils.getToken()}`,
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
