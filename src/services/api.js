import fetch from 'isomorphic-unfetch'

const baseURL = 'http://localhost:5000'

export const customFetch = async (endpoint, options) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `bearer ${JSON.parse(localStorage.getItem('usuario')).token}`
  }


  const response = await fetch(`${baseURL}/${endpoint}`, {
    ...options,
    headers
  })

  if (response.ok) {
    return {
      ok: true,
      data: await response.json()
    }
  }
  return response
}

const post = (endpoint, data) => {
  return customFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

const patch = (endpoint, data, id) =>
  id ? 
  customFetch(`${endpoint}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  }) : 
  customFetch(`${endpoint}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })

const getProfessores = () => customFetch('professores')
const postProfessor = body => post('professores', body)
const updateProfessor = (body, id) => patch('professores', body, id)

const getDisciplinas = () => customFetch('disciplinas')
const getDisciplinasById = id => customFetch(`disciplinas/${id}`)
const getDisciplinasWithTurmaSerie = ({turmaId, serieId}) => customFetch(`disciplinas?turmaId=${turmaId}&serieId=${serieId}`) 

const getAlunos = () => customFetch('aluno')
const getAlunoByCpf = cpf => customFetch(`aluno/${cpf}`)

const getSeries = () => customFetch('series')
const getTurmas = () => customFetch('turmas')
const getRelatorioTurma = ({serieId, turmaId, ano}) => customFetch(`relatorio-turma?ano=${ano}&turma=${turmaId}&serie=${serieId}`)
const getFrequencias = ({turmaId, dia, disciplinaId}) => customFetch(`frequencia-aluno?turmaId=${turmaId}&dia=${dia}&disciplinaId=${disciplinaId}`)

const getNotas = ({turmaId, disciplinaId}) => customFetch(`notas/${turmaId}/${disciplinaId}`)
const patchNota = nota => patch(`notas/${nota.id}`, nota)
const postNota = nota => post('notas', nota)

const trancarAluno = cpf => patch('trancar', { cpf })

export const getTestApi = () => customFetch('test')
export const postTestApi = () => post('test', ({ testing: 'post' }))
export const patchTestApi = () => patch('test', ({ testing: 'patch' }))

export default {
  getTestApi,
  postTestApi,
  patchTestApi,
  getProfessores,
  postProfessor,
  updateProfessor,
  getDisciplinas,
  getDisciplinasWithTurmaSerie,
  getSeries,
  getTurmas,
  getRelatorioTurma,
  getFrequencias,
  trancarAluno,
  getAlunos,
  getNotas,
  postNota,
  patchNota,
  getAlunoByCpf,
  getDisciplinasById
}
