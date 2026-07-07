export default function Recipe() {
  return (
    <>
      <button onClick={() => window.history.back()}>Back</button>
      <h1>Recipe</h1>
      <h2>Ingredients</h2>
      <ul>
        <li>1 cup of flour</li>
        <li>2 eggs</li>
      </ul>
      <h2>side notes</h2>
      <p>These are some additional notes about the recipe.</p>

      <h2>Instructions</h2>
      <ol>
        <li>Mix the ingredients.</li>
        <li>Bake for 30 minutes.</li>
      </ol>
    </>
  );
}
