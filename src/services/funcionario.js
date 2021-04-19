import axios from 'axios';

class Funcionario {
  async buscarTodos () {
    const url = 'http://localhost:5000/funcionario';
    return await axios.get(url);
  }

  async criar (funcionario) {
    const url = `http://localhost:5000/funcionario`;
    return await axios.post(url, funcionario)
  }

  async atualizar (funcionario) {
    const url = `http://localhost:5000/funcionario`;
    return await axios.patch(url, funcionario)
  }

  async deletar (funcionario) {
    const url = `http://localhost:5000/funcionario`;
    return await axios.delete(url, {data:funcionario})
  }
}

export default Funcionario;