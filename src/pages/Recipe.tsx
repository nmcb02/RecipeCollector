import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import KoFi from "../components/KoFi";
import RecipeBook from "../components/RecipeBook";

type RecipeBook = {
  id: number;
  name: string;
  recipes: Recipe[];
};

type Recipe = {
  name: string;
  ingredients: string[];
  sideNotes: string[];
  instructions: string[];
};

export default function Recipe() {
  const { id, index } = useParams();

  const [RecipeBook, setRecipeBook] = useState<RecipeBook | null>(null);
  const [Recipe, setRecipe] = useState<Recipe | null>(null);

  var editEnabled = false; // Placeholder for edit functionality

  useEffect(() => {
    const storedBooks = localStorage.getItem("recipeBooks");
    if (!storedBooks) return;

    const books: RecipeBook[] = JSON.parse(storedBooks);

    const foundBook = books.find((b) => b.id === Number(id));
    if (!foundBook) return;
    setRecipeBook(foundBook);
    setRecipe(foundBook.recipes[Number(index)]);
  }, [id, index]);

  if (!RecipeBook || !Recipe) {
    return (
      <>
        <h1>Recipe Not Found</h1>
        <button onClick={() => window.history.back()}>Back</button>
      </>
    );
  }

  function handleEdit() {
    editEnabled = !editEnabled;
    return (
      <>
        <h1>Edit Recipe</h1>
        <button onClick={() => window.history.back()}>Back</button>
        <div className="recipe-container">
          <h1>{Recipe.name}</h1>
          <p>Edit functionality is not implemented yet.</p>
        </div>
      </>
    );
  }

  function addIngredient() {}
  function addSideNote() {}
  function addInstruction() {}

  return (
    <>
      <button onClick={() => window.history.back()}>Back</button>
      <div className="recipe-container">
        <h1>{Recipe.name}</h1>
        <button onClick={handleEdit}>Edit</button>

        <div>
          <h2>Ingredients</h2>
          <input
            type="text"
            value={Recipe.ingredients.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...Recipe,
                ingredients: e.target.value
                  .split(",")
                  .map((item) => item.trim()),
              });
            }}
            placeholder="Add new ingredient"
          />
          <button onClick={addIngredient}>Add Ingredient</button>

          <ul>
            {Recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Side Notes</h2>
          <input
            type="text"
            value={Recipe.sideNotes.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...Recipe,
                sideNotes: e.target.value.split(",").map((item) => item.trim()),
              });
            }}
            placeholder="Add new side note"
          />
          <button onClick={addSideNote}>Add Side Note</button>
          <p>{Recipe.sideNotes}</p>
        </div>

        <div>
          <h2>Instructions</h2>
          <input
            type="text"
            value={Recipe.instructions.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...Recipe,
                instructions: e.target.value

                  .split(",")
                  .map((item) => item.trim()),
              });
            }}
            placeholder="Add new instruction"
          />
          <button onClick={addInstruction}>Add Instruction</button>

          <ol>
            {Recipe.instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      <KoFi />
    </>
  );
}
