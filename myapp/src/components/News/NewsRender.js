import React from 'react';

function NewsRender(props) {
    const { data } = props
    return <div
        className="news"
        key={data.id}>
        <img className="news-image" src={data.imageUrl} alt={data.title} />
        <div className="news-wrapper">
            <h4 className="news-title"><a className="news-link" href={data.url}>{data.title}</a></h4>
            <p className="news-text">{data.summary}</p>
        </div>
    </div>
}

export default NewsRender