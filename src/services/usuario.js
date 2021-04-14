import axios from 'axios';

export class Usuario {
  async criar (user) {
    const url = `http://localhost:5000/users`;
    return await axios.post(url, {...user})
  }

  async atualizar (username, user) {
    const url = `http://localhost:5000/users/${username}`;
    return await axios.put(url, {...user})
  }

  async deletar (username) {
    const url = `http://localhost:5000/users/${username}`;
    return await axios.delete(url)
  }
}