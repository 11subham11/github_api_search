import "./App.css";
import SearchPage from "./Pages/SearchPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
