import fetch from 'isomorphic-unfetch'

const baseURL = 'http://localhost:5000'

const customFetch = async (endpoint, options) => {
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

const patch = (endpoint, data) =>
  customFetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })

export const getTestApi = () => customFetch('test')
export const postTestApi = () => post('test', ({ testing: 'post' }))
export const patchTestApi = () => patch('test', ({ testing: 'patch' }))

export default {
  getTestApi,
  postTestApi,
  patchTestApi
}
