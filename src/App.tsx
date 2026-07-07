import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Button from "./components/Button";
import KoFi from "./components/KoFi";
import RecipeBooks from "./pages/RecipeBooks";
import Settings from "./pages/Settings";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Recipe Collector</h1>
      <Button
        label="View Recipe Books"
        onClick={() => navigate("/recipe-books")}
      />
      <Button label="Settings" onClick={() => navigate("/settings")} />
      <KoFi />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-books" element={<RecipeBooks />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
