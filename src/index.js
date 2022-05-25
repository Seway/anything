import React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ReactDOM from 'react-dom';


const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </Routes>

    </div>
  </Router>
);
ReactDOM.render(
  <AppRouter />,
  document.getElementById('root')
);