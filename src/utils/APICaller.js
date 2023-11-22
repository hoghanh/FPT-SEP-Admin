import Axios from 'axios';
import { FPTSEP } from '../config';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjgsIm5hbWUiOiJDYW8gSG9uZyBIYW5oIiwicGhvbmUiOiIwODY1NjQ0MTYzIiwiZW1haWwiOiJjYW9oYW5oMTcxMUBnbWFpbC5jb20iLCJhZGRyZXNzIjoiMTIzIExlIFZhbiBWaWV0dHR0ICIsImltYWdlIjoiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9mcHQtc2VwLWZlLWViMjI3LmFwcHNwb3QuY29tL28vaW1hZ2VzJTJGYXZhdGFycyUyRm9yYW5nZS5qcGc_YWx0PW1lZGlhJnRva2VuPWRlNzU5ZGE5LTAwMzItNDY4Zi04MmEyLTY1NDJlM2MwYTQ0YSIsInBhc3N3b3JkIjoiJDJiJDEwJGZ3eDlwMTAvTENBOGFJYkZGVUtpdk92enpmZlVaYVl0dzVFYkNnb2tHOWJSZ3FiOExHd2FpIiwicm9sZSI6ImNsaWVudCIsInN0YXR1cyI6ZmFsc2V9LCJpYXQiOjE3MDA2Njg4NTMsImV4cCI6MTcwMDY3MjQ1M30.rCjRIj7riWTCRXfXFfItqJG-QOuuF_Dz91iUjhzUV40`,
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
