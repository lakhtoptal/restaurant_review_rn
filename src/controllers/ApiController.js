import { HttpClient } from './HttpClient';

export default class ApiController {
  constructor(moduleName) {
    this.apiPath = `/${moduleName}`;
    this.createPath = `/${moduleName}/create`;
  }

  getAll = async () => {
    const result = await HttpClient.get(this.apiPath);
    return Promise.resolve(result);
  };

  getItem = async (id) => {
    const result = await HttpClient.get(`${this.apiPath}/${id}`);
    return Promise.resolve(result);
  };

  create = async (payload) => {
    const result = await HttpClient.post(this.createPath, payload);
    return Promise.resolve(result);
  };

  update = async (payload) => {
    const result = await HttpClient.put(`${this.apiPath}/${payload.id}`, payload);
    return Promise.resolve(result);
  };

  delete = async (id) => {
    const result = await HttpClient.delete(`${this.apiPath}/${id}`);
    return Promise.resolve(result);
  };
}
