import axios from 'axios'

export async function fetcher (url, options = {}) {
  const response = await axios(url, options)
  console.log('RESPONSE', response)
  return response
}
