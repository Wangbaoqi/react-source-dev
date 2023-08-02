import './App.css'

import { Outlet, Link } from 'react-router-dom';
function App() {

  return (
    <>
      <div id="sidebar">
        <h1>React Everything Test</h1>
        <nav>
          <ul>
            <li>
              <Link to={`/jsx`} >JSX</Link>
            </li>
            <li>
              <Link to={`/class-component`} >class Components</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  )
}

export default App
