import { Redirect, Route, Switch } from 'react-router';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import Articles from './components/Articles';
import SingleArticle from './components/ArticleComponents/SingleArticle';

function App() {

  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
    <header>
     <Header className="main_title"/>
     <Nav className="nav_bar"/>
     </header>
     <Switch>
       <Route exact path="/">
        <Redirect to="/Home" />
       </Route>
       <Route exact path="/Home">
         <Home articles={articles} setArticles={setArticles}/>
       </Route>
       <Route exact path="/articles">
         <Articles  articles={articles} setArticles={setArticles}/>
       </Route>
       <Route exact path="/articles/topics/:topic">
         <Articles  articles={articles} setArticles={setArticles}/>
       </Route>
       <Route exact path="/articles/:article_id">
         <SingleArticle />
       </Route>
     </Switch>
    </div>
  );
}

export default App;



//Tomorrow - last task was trying to create the singleArticle component - 
//tried to rerender the articles component but cant seem to pass the params on the axios object or get them from useParams.
// began making single article component but now also can't reuse ArticleCard component because it needs articles state to work - which would then need to be 'filtered' by article id -  but can't do this becasue of the above problem
//ask how to pass multiple params through to the request or start making the singleArticle component from scratch.
