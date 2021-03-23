import axios from 'axios';

class Login {
  async autenticar(credenciais) {
    const data = {...credenciais};
    const url = `http://localhost:5000/login`;
    return axios.post(url, {
      ...data
    })
  }
}