import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const Capitalize=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const update= async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true )
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(parseData.articles)
    setloading(false)
    settotalResults(parseData.totalResults)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = Capitalize(`${props.category}-NewsMonkey`);
    update();
  }, [])
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    setpage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
  };
  return (
    <>
        <h1 className="text-center" style={{margin:"35px",marginTop: "90px"}}>NewsMonkey-Top {Capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row " >
              {articles.map((ele) => {
                return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title ? ele.title.slice(0, 44) : ""} description={ele.description ? ele.description.slice(0, 88) : ""} imageURL={ele.urlToImage} newsURL={ele.url} author={ele.author} date={ele.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )

}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News