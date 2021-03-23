import fetch from 'isomorphic-unfetch'

const baseURL = 'http://localhost:5000'

export const customFetch = async (endpoint, options) => {
  const headers = {
    'Content-Type': 'application/json',
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
  customFetch(`${endpoint}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })

const getProfessores = () => customFetch('professores')
const postProfessor = body => post('professores', body)
const updateProfessor = (body, id) => patch('professores', body, id)

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
}
