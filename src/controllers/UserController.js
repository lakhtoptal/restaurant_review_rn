import { strings } from '@/localization';

export class UserController {
  static login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          resolve({ username });
        } else {
          reject(new Error(strings.login.invalidCredentials));
        }
      }, 250);
    });
  }

  static register(payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password, firstName, lastName, role } = payload;
        if (username && password && firstName && lastName && role) {
          resolve({ username });
        } else {
          reject(new Error('Registeration failed.'));
        }
      }, 250);
    });
  }

  static logout() {
    return new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
  }
}
