import axios from 'axios';

class Aluno {
  async buscarTodos () {
    const url = 'http://localhost:5000/aluno';
    return await axios.get(url);
  }

  async buscaCPF (cpf) {
    const url = `http://localhost:5000/aluno`;
    return await axios.get(url, cpf);
  }

  async criar (aluno) {
    const url = `http://localhost:5000/aluno`;
    return await axios.post(url, aluno)
  }

  async atualizar (aluno) {
    const url = `http://localhost:5000/aluno`;
    return await axios.put(url, aluno)
  }

  async deletar (id) {
    const url = `http://localhost:5000/aluno/${id}`;
    return await axios.delete(url)
  }

}

export default Aluno;