import axios from 'axios';

class Login {
  async autenticar(credenciais) {
    const url = `http://localhost:5000/signin`;
    return axios.post(url,{...credenciais})
  }
}

export default Login;
