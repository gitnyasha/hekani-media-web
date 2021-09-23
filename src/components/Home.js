import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = (props) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {

        try {
                const res = await axios.get('http://localhost:3001/articles', {withCredentials: true})
                .then((response) => {
                    const myArticles = response.data;
                    setArticles(myArticles);
                    setIsLoading(false);
                })
        } catch (error) {
            console.error(error);
        }
    }
    fetchArticles();
    }, [])

    return (
        <div className="container">
            {isLoading ? (
                <h1 className="text-center m-50">Loading...</h1>
                
            ) : (<div>
                    <div className="row">
                        <h1>Hello World</h1>
                    </div>
                    <div className="row">
                        {articles.map((article) => (
                            <div className="col-sm-10 banner m-1">
                                <article key={article.id}>
                                    <a href={article.link} target="_blank">{article.title}</a>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>)}
        </div>
    );
}

export default Home;