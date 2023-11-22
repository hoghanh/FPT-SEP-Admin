import Axios from 'axios';
import { FPTSEP } from '../config';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjgsIm5hbWUiOiJDYW8gSG9uZyBIYW5oIiwicGhvbmUiOiIwODY1NjQ0MTYzIiwiZW1haWwiOiJjYW9oYW5oMTcxMUBnbWFpbC5jb20iLCJhZGRyZXNzIjoiMTIzIExlIFZhbiBWaWV0dHR0IiwiaW1hZ2UiOiJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2ZwdC1zZXAtZmUtZWIyMjcuYXBwc3BvdC5jb20vby9pbWFnZXMlMkZhdmF0YXJzJTJGT0lQLmpwZz9hbHQ9bWVkaWEmdG9rZW49ZmVmOGU3MjgtMDcxMy00NzdhLWE0YjItOGM4MTJiNGJmM2VjIiwicGFzc3dvcmQiOiIkMmIkMTAkZnd4OXAxMC9MQ0E4YUliRkZVS2l2T3Z6emZmVVphWXR3NUViQ2dva0c5YlJncWI4TEd3YWkiLCJyb2xlIjoiY2xpZW50Iiwic3RhdHVzIjp0cnVlfSwiaWF0IjoxNzAwNjYyOTg5LCJleHAiOjE3MDA2NjY1ODl9.4lzeEVi3i6OQLgoZy6X6_GQ3cMKBki_QEmANnxtSKR4`,
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
