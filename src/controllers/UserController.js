import ApiController from './ApiController';
import { HttpClient } from './HttpClient';

class UserController extends ApiController {
  constructor() {
    const moduleName = 'users';
    super(moduleName);
    this.userPath = `/${moduleName}`;
    this.loginPath = `/${moduleName}/authenticate`;
    this.registerPath = `/${moduleName}/register`;
  }

  login = async (username, password) => {
    const result = await HttpClient.post(this.loginPath, {
      username,
      password,
    });
    return Promise.resolve(result);
  };

  register = async (payload) => {
    const result = await HttpClient.post(this.registerPath, payload);
    return Promise.resolve(result);
  };

  logout = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  };
}

export default new UserController();
