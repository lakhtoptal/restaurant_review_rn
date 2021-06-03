import { HttpClient } from './HttpClient';

const moduleName = 'users';

class UserController {
  constructor() {
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
