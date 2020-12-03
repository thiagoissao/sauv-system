export const anos = [
  {
    value: '2020',
    label: '2020'
  },
  {
    value: '2019',
    label: '2019'
  },
  {
    value: '2018',
    label: '2018'
  },
  {
    value: '2017',
    label: '2017'
  },
]

export const series = [
  {
    label: '1ª',
    value: 1
  },
  {
    label: '2ª',
    value: 2
  },
  {
    label: '3ª',
    value: 3
  },
  {
    label: '4ª',
    value: 4
  },
  {
    label: '5ª',
    value: 5
  },
  {
    label: '6ª',
    value: 6
  },
  {
    label: '7ª',
    value: 7
  },
  {
    label: '8ª',
    value: 8
  },
]

export const turmas = [
  {
    label: 'A',
    value: 'a'
  },
  {
    label: 'B',
    value: 'b'
  },
  {
    label: 'C',
    value: 'c'
  },
  {
    label: 'D',
    value: 'd'
  },
]

export const disciplinas = [
  {
    idDisciplina: 1,
    nome: 'Matemática'
  },
  {
    idDisciplina: 2,
    nome: 'Física'
  }
]

export const alunosMatematica = Array(20).fill({}).map((aluno, index) => ({
  nome: `Pedro ${index}`,
  idDisciplina: 1,
  disciplina: 'Matemática',
  nota1b: Math.floor(Math.random() * 10),
  nota2b: Math.floor(Math.random() * 10),
  nota3b: Math.floor(Math.random() * 10),
  nota4b: Math.floor(Math.random() * 10)
}))

export const alunosFisica = Array(20).fill({}).map((aluno, index) => ({
  nome: `Carlos ${index}`,
  idDisciplina: 1,
  disciplina: 'Matemática',
  nota1b: Math.floor(Math.random() * 10),
  nota2b: Math.floor(Math.random() * 10),
  nota3b: Math.floor(Math.random() * 10),
  nota4b: Math.floor(Math.random() * 10)
}))
