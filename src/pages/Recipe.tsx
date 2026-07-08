import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import KoFi from "../components/KoFi";

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
  const navigate = useNavigate();

  const [recipeBook, setRecipeBook] = useState<RecipeBook | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [editMode, setEditMode] = useState(false); // State to track if edit mode is enabled

  useEffect(() => {
    const storedBooks = localStorage.getItem("recipeBooks");
    if (!storedBooks) return;

    const books: RecipeBook[] = JSON.parse(storedBooks);

    const foundBook = books.find((b) => b.id === Number(id));
    if (!foundBook) return;
    setRecipeBook(foundBook);
    setRecipe(foundBook.recipes[Number(index)]);
  }, [id, index]);

  if (!recipeBook || !recipe) {
    return (
      <>
        <h1>Recipe Not Found</h1>
        <button onClick={() => window.history.back()}>Back</button>
      </>
    );
  }

  function handleEdit() {
    setEditMode(!editMode);
  }

  return (
    <>
      <button onClick={() => window.history.back()}>Back</button>
      <div className="recipe-container">
          <h1>{recipe.name}</h1>
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
        <h1>{recipe.name}</h1>
        <button onClick={handleEdit}>Edit</button>

        <div>
          <h2>Ingredients</h2>
          <input
            type="text"
            value={recipe.ingredients.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                ingredients: e.target.value
                  .split(",")
                  .map((item) => item.trim()),
              });
            }}
            placeholder="Add new ingredient"
          />
          <button onClick={addIngredient}>Add Ingredient</button>

          <ul>
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Side Notes</h2>
          <input
            type="text"
            value={recipe.sideNotes.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                sideNotes: e.target.value.split(",").map((item) => item.trim()),
              });
            }}
            placeholder="Add new side note"
          />
          <button onClick={addSideNote}>Add Side Note</button>
          <p>{recipe.sideNotes}</p>
        </div>

        <div>
          <h2>Instructions</h2>
          <input
            type="text"
            value={recipe.instructions.join(", ")}
            onChange={(e) => {
              setRecipe({
                ...recipe,
                instructions: e.target.value

                  .split(",")
                  .map((item) => item.trim()),
              });
            }}
            placeholder="Add new instruction"
          />
          <button onClick={addInstruction}>Add Instruction</button>

          <ol>
            {recipe.instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
      <KoFi />
    </>
  );
}
