import axios from 'axios'

export async function fetcher (url, options = {}) {
  const response = await axios(url, options)
  // console.log('RESPONSE', response)
  return response
}

export async function fetchMoreMovies (parameters = {
  country: '',
  genred: '',
  page: 1,
  pageSize: 12
}) {
  console.log('fetchMoreMovies', parameters)
  const optionsFetchMovies = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_API}`
    },
    params: {
      'fields[0]': 'title',
      'fields[1]': 'movie_uid',
      'populate[cover][fields][0]': 'url',
      'populate[genreds][fields][0]': 'genred_uid',
      'pagination[page]': parameters.page,
      'pagination[pageSize]': parameters.pageSize
    }
  }
  if (parameters.country !== '') {
    optionsFetchMovies.params['filters[countries][country_uid][$eq]'] = parameters.country
  }
  if (parameters.genred !== '') {
    optionsFetchMovies.params['filters[genreds][genred_uid]​[$eq]'] = parameters.genred
  }
  const { data: moviesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)
  console.log('Movies Response', moviesResponse)
  return {
    movies: moviesResponse.data,
    pagination: moviesResponse.meta.pagination
  }
}
