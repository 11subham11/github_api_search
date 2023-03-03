import "./App.css";
import SearchPage from "./Pages/SearchPage";

import { Routes, Route } from "react-router-dom";
import RepoDetailPage from "./Pages/RepoDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<SearchPage />} />
        <Route path="/repos/:repoId" exact element={<RepoDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
