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
      'pagination[page]': parameters.page,
      'pagination[pageSize]': parameters.pageSize
    }
  }
  if (parameters.country !== '') {
    optionsFetchMovies.params['filters[countries][country_uid][$eq]'] = parameters.country
  }
  if (parameters.genred !== '') {
    optionsFetchMovies.params['filters[genreds][genred_uid]​[$eq]'] = parameters.genred
    optionsFetchMovies.params['populate[genreds][fields][0]'] = parameters.genred_uid
  }
  const { data: moviesResponse } = await fetcher(`${process.env.NEXT_PUBLIC_URL_API}/movies`, optionsFetchMovies)
  console.log('Movies Response', moviesResponse)
  return {
    movies: moviesResponse.data,
    pagination: moviesResponse.meta.pagination
  }
}

export const formatMovies = (movies) => {
  const data = movies.map((movie) => {
    const data = {
      id: movie.id,
      title: movie.attributes.title,
      cover: movie.attributes.cover.data.attributes.url,
      movie_uid: movie.attributes.movie_uid
    }
    if (movie?.attributes?.genreds) {
      data.genreds = movie.attributes.genreds.data.map((g) => {
        return g.attributes.genred_uid
      })
    }
    return data
  })
  return data
}

export const formatOnlyMovies = (movies) => {
  const data = movies.map((movie) => {
    return {
      id: movie?.id,
      title: movie?.attributes?.title,
      cover: movie?.attributes?.cover?.data?.attributes?.url,
      movie_uid: movie?.attributes?.movie_uid
    }
  })
  return data
}
