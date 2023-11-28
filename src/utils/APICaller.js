import Axios from 'axios';
import { FPTSEP } from '../config';
import LocalStorageUtils from './LocalStorageUtils';

export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjQ3LCJuYW1lIjoiQURNSU4iLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJGUFQtU0VQLUFkbWluQGdtYWlsLmNvbSIsImFkZHJlc3MiOm51bGwsImltYWdlIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCRlbFJFdFZBRTBpd3NiVG1yekpVVDR1S0d1Y1JzLlYzT0hWbHhHZXBrcUxRb3JZaWxJdXU3ZSIsInJvbGUiOiJhZG1pbiIsInN0YXR1cyI6dHJ1ZX0sImlhdCI6MTcwMTE1OTYyMywiZXhwIjoxNzAxMTYzMjIzfQ.aquYRlh6lX0KN359I3paY6Y1GI4TU91XzdhKPYVvr6w`,
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
