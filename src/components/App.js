import { Route, Routes } from 'react-router-dom'

import Home from "./Home"
import MovieDetail from "./MovieDetail";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<MovieDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;