import './App.css';
import ErrorPage from './pages/ErrorPage';
import {Routes, Route} from react-router-dom

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path="*" element={ErrorPage}/>
      </Routes>
    </div>
  );
}

export default App;
