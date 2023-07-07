import './App.css';
import Route from './components/Route';
import Router from './components/Router';
import About from './pages/About';
import Root from './pages/Root';

function App() {
  return (
    <Router>
      <Route path='/' component={<Root />} />
      <Route path='/about' component={<About />} />
    </Router>
  );
}

export default App;
