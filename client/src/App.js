import logo from './logo.svg';
import './App.css';

import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management System (CRUD)</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Product/>
    </div>
  );
}

export default App;
