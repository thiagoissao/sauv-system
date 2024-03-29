import axios from 'axios';

class Serie {
  async buscaTodas () {
    const url = 'http://localhost:5000/series';
    return await axios.get(url);
  }

  async buscaPorAnoLetivo (serie) {
    const url = `http://localhost:5000/series/${serie}`;
    return await axios.get(url);
  }

  async save (serie) {
    if(serie.id) {
      const url = `http://localhost:5000/series/${serie.id}`;
      return await axios.put(url, {...serie})
    } else {
      const url = 'http://localhost:5000/series';
      return await axios.post(url, {...serie});
    }
  }

  async deletar (id) {
    const url = `http://localhost:5000/series/${id}`;
    return await axios.delete(url)
  }

}

export default Serie;