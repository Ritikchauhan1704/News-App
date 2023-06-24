import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageURL, newsURL, author, date } = props;
  return (
    <div className='my-4'>
      <div className="card ">
        <img src={imageURL ? imageURL : "https://www.hindustantimes.com/ht-img/img/2023/05/20/1600x900/Breaking-News-Live-Blog-pic_1627344775185_1684021550502_1684626935134.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          <p className="card-text"><small className="text-body-secondary">By-{author ? author : "Unknown"}   on {new Date(date).toGMTString()}</small></p>
        </div>
      </div>
    </div>
  )

}

export default NewsItem