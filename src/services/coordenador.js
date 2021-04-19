import axios from 'axios';

class Coordenador {
  async buscarTodos () {
    const url = 'http://localhost:5000/coordenador';
    return await axios.get(url);
  }

  async criar (coordenador) {
    const url = `http://localhost:5000/coordenador`;
    return await axios.post(url, coordenador)
  }

  async atualizar (coordenador) {
    const url = `http://localhost:5000/coordenador`;
    return await axios.patch(url, coordenador)
  }

  async deletar (coordenador) {
    const url = `http://localhost:5000/coordenador`;
    return await axios.delete(url, {data:coordenador})
  }
}

export default Coordenador;