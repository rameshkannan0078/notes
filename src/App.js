
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Todo from './todo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo/>} >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;