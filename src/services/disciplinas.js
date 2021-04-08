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

  async save (disciplina) {
    if(disciplina.id) {
      const url = `http://localhost:5000/disciplinas/${disciplina.id}`;
      return await axios.put(url, {
        data: {...disciplina}
      })
    } else{
      const url = 'http://localhost:5000/disciplinas';
      return await axios.post(url, {
        data: {...disciplina}
      })
    }
  }

  async deletar (id) {
    const url = `http://localhost:5000/disciplinas/${id}`;
    return await axios.delete(url)
  }

}

export default Disciplinas;