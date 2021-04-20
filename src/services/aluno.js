import axios from 'axios';

class Aluno {
  async buscarTodos () {
    const url = 'http://localhost:5000/aluno';
    return await axios.get(url);
  }

  async buscaCPF (cpf) {
    cpf = cpf.replace(".","")
    cpf = cpf.replace(".","")
    cpf = cpf.replace("-","")
    console.log(cpf)
    const url = `http://localhost:5000/aluno/${parseInt(cpf)}`;
    return await axios.get(url);
  }

  async criar (aluno) {
    const url = `http://localhost:5000/aluno`;
    return await axios.post(url, aluno)
  }

  async atualizar (aluno) {
    const url = `http://localhost:5000/aluno`;
    return await axios.patch(url, aluno)
  }

  async deletar (aluno) {
    const url = `http://localhost:5000/aluno`;
    return await axios.delete(url, {data:aluno})
  }

  async trocaTurma (aluno) {
    const url = `http://localhost:5000/troca-turma`
    return await axios.post(url, {...aluno})
  }

}

export default Aluno;