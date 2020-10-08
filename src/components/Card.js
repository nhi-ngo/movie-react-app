import React, { useEffect } from 'react'

export default function Card(props) {
  let {
    title,
    tagline,
    overview,
    release,
    runtime,
    genres,
    vote,
    backdrop,
    poster,
  } = props.data

  const noData = '-'
  let posterImg = `https://image.tmdb.org/t/p/w500${poster}`
  const backdropImg = `https://image.tmdb.org/t/p/original${backdrop}`
  const genresList = arrayToString(genres)

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backdropImg})`
  }, [title])

  function arrayToString(dataArray) {
    const array = []
    let resultString

    if (dataArray !== undefined) {
      dataArray.forEach((item) => array.push(item.name))
    }

    resultString = array.join(', ')
    return resultString
  }

  // if no-data
  if (vote === undefined || vote === 0) {
    vote = noData
  } else {
    vote = `${vote} / 10`
  }

  if (poster === null) {
    posterImg =
      'https://static.wixstatic.com/media/84428b_aec5877604ff494295b3af5af0b27a67~mv2.png/v1/fill/w_300,h_300,al_c,q_95/84428b_aec5877604ff494295b3af5af0b27a67~mv2.webp'
  }

  return (
    <div className="card-container">
      <div className="data-container">
        <div className="overview-details">
          <h1 className="title">{title}</h1>
          <span className="tagline">{tagline}</span>
          <p className="overview">{overview}</p>

          <div className="release-details">
            <div>
              <div>
                Release Date: <span className="meta-data"> {release}</span>
              </div>
              <div>
                Vote Average: <span className="meta-data">{vote}</span>
              </div>
            </div>
            <div>
              <div>
                Running Time: <span className="meta-data">{runtime} mins</span>
              </div>
              <div>
                Genres: <span className="meta-data"> {genresList}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="poster-container">
          <img src={posterImg} alt={title} className="poster-img" />
        </div>
      </div>
    </div>
  )
}
