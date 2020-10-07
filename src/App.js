import React, { useEffect, useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import axios from 'axios'

import Card from './components/Card'
import MovieLogo from './images/logo.svg'

const App = () => {
  const [data, setData] = useState({})
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const API = '&api_key=aa18e4c975fdcdd4144c5ea573ce10ae'
  const INITIAL_URL = `https://api.themoviedb.org/3/movie/257211?${API}`
  const SEARCH_URL =
    'https://api.themoviedb.org/3/search/movie?&language=en-US&page=1&include_adult=false'

  useEffect(() => {
    fetchApi(INITIAL_URL)
  }, [])

  const fetchApi = (url) => {
    axios.get(url).then((res) => {
      const { data } = res

      setData({
        movieId: data.id,
        title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        release: data.release_date,
        runtime: data.runtime,
        genres: data.genres,
        vote: data.vote_average,
        homepage: data.homepage,
        backdrop: data.backdrop_path,
        poster: data.poster_path,
      })
    })
  }

  const fetchMovieId = (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?${API}`
    fetchApi(url)
  }

  const handleSearch = async (term) => {
    setIsLoading(true)

    const response = await axios.get(`${SEARCH_URL}?${API}&query=${term}`)

    const searchResults = response.data.results.map((i) => ({
      id: i.id,
      title: i.original_title,
    }))

    setOptions(searchResults)
    setIsLoading(false)
  }

  return (
    <div className="app-container">
      <div className="header">
        <a href="/" title="TMDb Movie Search">
          <img src={MovieLogo} alt="Movie Database" className="logo" />
        </a>

        <div className="searchBox">
          <AsyncTypeahead
            id="unique_id"
            labelKey="title"
            isLoading={isLoading}
            onSearch={handleSearch}
            options={options}
            className="searchBox__input"
            placeholder="Search Movie Title..."
            renderMenuItemChildren={(option) => (
              <div key={option.id} onClick={() => fetchMovieId(option.id)}>
                <span>{option.title}</span>
              </div>
            )}
          />
        </div>
      </div>

      <Card data={data} />
    </div>
  )
}

export default App
