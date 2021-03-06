import axios from 'axios';

class Turma {
  async buscaTodas () {
    const url = 'http://localhost:5000/turmas';
    return await axios.get(url);
  }

  async buscaPorNome (nome) {
    const url = `http://localhost:5000/turmas?nome=${nome}`;
    return await axios.get(url);
  }
  
  async buscaPorId (id) {
    const url = `http://localhost:5000/turmas/${id}`;
    return await axios.get(url);
  }

  async criar (turma) {
    const data = {...turma}
    const url = 'http://localhost:5000/turmas';
    return await axios.post(url, {
      ...data
    });
  }
  
  async atualizar (id, turma) {
    const data = {...turma}
    const url = `http://localhost:5000/turmas/${id}`;
    return await axios.put(url, {
      ...data
    })
  }

  async deletar (id) {
    const url = `http://localhost:5000/turmas/${id}`;
    return await axios.delete(url)
  }

}

export default Turma;