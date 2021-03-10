import axios from 'axios';

class Disciplinas {
  async buscaTodas () {
    const url = 'http://localhost:5000/disciplinas';
    return await axios.get(url);
  }

  async buscaPorNome (nome) {
    const url = `http://localhost:5000/disciplinas?nome=${nome}`;
    return await axios.get(url);
  }

  async buscaPorId (id) {
    const url = `http://localhost:5000/disciplinas/${id}`;
    return await axios.get(url);
  }

  async criar (disciplina) {
    const data = {...disciplina};
    const url = 'http://localhost:5000/disciplinas';
    return await axios.post(url, {
      ...data
    })
  }
  
  async atualizar (id, disciplina) {
    const url = `http://localhost:5000/disciplinas/${id}`;
    return await axios.put(url, {
      data: {
        ...disciplina
      }
    })
  }

  async deletar (id) {
    const url = `http://localhost:5000/disciplinas/${id}`;
    return await axios.delete(url)
  }

}

export default Disciplinas;