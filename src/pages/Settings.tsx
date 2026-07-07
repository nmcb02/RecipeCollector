import { useNavigate } from "react-router-dom";
import KoFi from "../components/KoFi";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Settings</h1>
      <button onClick={() => navigate("/")}>Back to Main Menu</button>

      <KoFi />
    </>
  );
}
