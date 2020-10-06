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
  let posterImg = `https://image.tmdb.org/t/p/w500/${poster}`
  const backdropImg = `https://image.tmdb.org/t/p/original/${backdrop}`
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
    <div>
      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
        <p>{overview}</p>

        <div className="release-details">
          <div className="col-xs-6">
            Release Date: <span>{release}</span>
          </div>
          <div className="col-xs-6">
            Running Time: <span>{runtime} mins</span>
          </div>
          <div className="col-xs-6">
            Genres: <span>{genresList}</span>
          </div>
          <div className="col-xs-6">
            Vote Average: <span>{vote}</span>
          </div>
        </div>

        <div className="poster-container">
          <img src={posterImg} alt={title} className="poster" />
        </div>
      </div>
    </div>
  )
}
