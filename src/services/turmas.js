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
  
  async buscaPorSerie (serie) {
    const url = `http://localhost:5000/turmas/${serie}`;
    return await axios.get(url);
  }

  async criar (turma) {
    if(turma.id) {
      const url = `http://localhost:5000/turmas/${turma.id}`;
      return await axios.put(url, {
        data: {...turma}
      })
    } else {
      const url = 'http://localhost:5000/turmas';
      return await axios.post(url, {
        data: {...turma}
      });
    }
  }
  
  async deletar (id) {
    const url = `http://localhost:5000/turmas/${id}`;
    return await axios.delete(url)
  }

}

export default Turma;