import { Route, Switch } from 'react-router';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';

function App() {

  const [articles, setArticles] = useState([]);

  return (
    <div className="App">
     <Header />
     <Nav />
     <Switch>
       <Route exact path="/">
         <Home articles={articles} setArticles={setArticles}/>
       </Route>
     </Switch>
    </div>
  );
}

export default App;
