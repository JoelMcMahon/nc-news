import { Route, Switch } from 'react-router';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import Articles from './components/Articles';

function App() {

  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
     <Header />
     <Nav />
     <Switch>
       <Route exact path="/Home">
         <Home articles={articles} setArticles={setArticles}/>
       </Route>
       <Route exact path="/articles">
         <Articles  articles={articles} setArticles={setArticles}/>
       </Route>
       <Route exact path="/articles/topics/:topic">
         <Articles  articles={articles} setArticles={setArticles}/>
       </Route>
     </Switch>
    </div>
  );
}

export default App;
