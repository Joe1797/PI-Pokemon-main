import './App.css';
import {Routes,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import MainPage from './components/MainPage/MainPage.jsx'
import Detail from './components/Detail/Detail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/pokemons' element={<MainPage/>} />
        <Route path='/pokemons/detail/:id' element={<Detail/>} />
        <Route path='/pokemons/create' element={<CreatePokemon/>} />
        <Route path='*' element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
