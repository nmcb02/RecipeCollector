import Button from "./components/Button";
import KoFi from "./components/KoFi";

function App() {
  return (
    <>
      <h1>Recipe Collector</h1>
      <Button
        label="View Recipe Books"
        onClick={() => console.log("View Recipe Books clicked")}
      />
      <Button
        label="Settings"
        onClick={() => console.log("Settings clicked")}
      />
      <KoFi />
    </>
  );
}

export default App;
