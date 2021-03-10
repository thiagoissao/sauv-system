import axios from 'axios';

class Serie {
  async buscaTodas () {
    const url = 'http://localhost:5000/series';
    return await axios.get(url);
  }

  async buscaPorAnoLetivo (anoLetivo) {
    const url = `http://localhost:5000/series?anoLetivo=${anoLetivo}`;
    return await axios.get(url);
  }

  async buscaPorId (id) {
    const url = `http://localhost:5000/series/${id}`;
    return await axios.get(url);
  }

  async criar (serie) {
    const data = {...serie}
    const url = 'http://localhost:5000/series';
    return await axios.post(url, {
      ...data
    });
  }
  
  async atualizar (id, serie) {
    const data = {...serie}
    const url = `http://localhost:5000/series/${id}`;
    return await axios.put(url, {
      ...data
    })
  }

  async deletar (id) {
    const url = `http://localhost:5000/series/${id}`;
    return await axios.delete(url)
  }

}

export default Serie;