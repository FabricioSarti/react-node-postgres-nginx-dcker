import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import OtherPage from './OtherPage';
import MainComponent from './MainComponent';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Fragment>
        <header>
          <div className="header">Este es una aplicacion multicontenedor</div>
          <Link to="/">Inicio</Link>
          <Link to="/otra-pagina">Otra pagina</Link>
        </header>
        <div className="main">
          <Routes>
            <Route path='/' Component={MainComponent} />
            <Route path='/otra-pagina' Component={OtherPage} />
          </Routes>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
