import { Redirect, Route, Switch } from "react-router";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/ArticleComponents/SingleArticle";
import LogInIndicator from "./components/LogInIndicator";
import Account from "./components/Account";
import Error from "./components/Error";

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="header_container">
        <Header className="header_container__main_title" />
        <LogInIndicator
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
          user={user}
        />
      </header>
      <div className="nav_container">
        <Nav className="nav_containener__nav_bar" />
      </div>
      <main className="main">
        <div className="main__container">
          <Switch>
            <Route exact path="/">
              <Redirect to="/Home" />
            </Route>
            <Route exact path="/Home">
              <Home articles={articles} setArticles={setArticles} />
            </Route>
            <Route exact path="/articles">
              <Articles articles={articles} setArticles={setArticles} />
            </Route>
            <Route exact path="/articles/topics/:topic">
              <Articles articles={articles} setArticles={setArticles} />
            </Route>
            <Route exact path="/articles/:article_id">
              <SingleArticle isLoggedIn={isLoggedIn} user={user} />
            </Route>
            <Route exact path="/account">
              <Account
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            </Route>
            <Route>
              <Error />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;

//Last task was trying to get the commentDisplay component to rerender after a comment had been posted. So far the comment is being posted and I've tried both including a get request within the onsubmit and resetting the commentbody state and including this in the dependencies of the ueseffet, neither seem to have the desired effect, which is only acheived when the page is refreshed or changed...
