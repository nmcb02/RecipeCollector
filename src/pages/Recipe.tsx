import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import KoFi from "../components/KoFi";

type Recipe = {
  name: string;
  ingredients: string[];
  sideNotes: string[];
  instructions: string[];
};

type RecipeBook = {
  id: number;
  name: string;
  recipes: Recipe[];
};

export default function RecipePage() {
  const { id, index } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<RecipeBook | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [instructionInput, setInstructionInput] = useState("");

  useEffect(() => {
    const storedBooks = localStorage.getItem("recipeBooks");
    if (!storedBooks) return;

    const books: RecipeBook[] = JSON.parse(storedBooks);
    const foundBook = books.find((b) => b.id === Number(id));

    if (!foundBook) return;

    setBook(foundBook);
    setRecipe(foundBook.recipes[Number(index)]);
  }, [id, index]);

  if (!book || !recipe) {
    return (
      <>
        <h1>Recipe Not Found</h1>
        <button onClick={() => navigate(-1)}>Back</button>
      </>
    );
  }

  function saveChanges() {
    if (!book || !recipe) return;

    const storedBooks = JSON.parse(localStorage.getItem("recipeBooks") || "[]");

    const updatedBooks = storedBooks.map((b: RecipeBook) =>
      b.id === book.id
        ? {
            ...b,
            recipes: b.recipes.map((r, i) =>
              i === Number(index) ? recipe : r,
            ),
          }
        : b,
    );

    localStorage.setItem("recipeBooks", JSON.stringify(updatedBooks));
    setEditMode(false);
  }

  function updateField(field: keyof Recipe, value: string) {
    setRecipe({
      ...recipe,
      [field]: value.split(",").map((item) => item.trim()),
    });
  }

  function handleInstructionInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setInstructionInput(e.target.value);
  }

  function saveInput(type: "ingredient" | "side_note" | "instruction") {
    if (type === "ingredient") {
      setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, instructionInput.trim()],
      });
    } else if (type === "side_note") {
      setRecipe({
        ...recipe,
        sideNotes: [...recipe.sideNotes, instructionInput.trim()],
      });
    } else if (type === "instruction") {
      setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, instructionInput.trim()],
      });
    }

    setInstructionInput("");
  }

  function onDelete(
    type: "ingredient" | "side_note" | "instruction",
    idx: number,
  ) {
    if (type === "ingredient") {
      setRecipe({
        ...recipe,
        ingredients: recipe.ingredients.filter((_, i) => i !== idx),
      });
    } else if (type === "side_note") {
      setRecipe({
        ...recipe,
        sideNotes: recipe.sideNotes.filter((_, i) => i !== idx),
      });
    } else if (type === "instruction") {
      setRecipe({
        ...recipe,
        instructions: recipe.instructions.filter((_, i) => i !== idx),
      });
    }
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>

      <div className="recipe-container">
        <h1>{recipe.name}</h1>

        {!editMode && (
          <>
            <button onClick={() => setEditMode(true)}>Edit</button>

            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <h2>Side Notes</h2>
            <ul>
              {recipe.sideNotes.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>

            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </>
        )}

        {editMode && (
          <>
            <h2>Edit Ingredients</h2>
            <input
              type="text"
              value={recipe.ingredients.join(", ")}
              onChange={(e) => updateField("ingredients", e.target.value)}
            />
            <button onClick={() => saveInput("ingredient")}>
              Add Ingredient
            </button>
            <ul>
              {recipe.ingredients.map((i, idx) => (
                <li key={idx}>
                  {i}
                  <button onClick={() => onDelete("ingredient", idx)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <h2>Edit Side Notes</h2>
            <input
              type="text"
              value={recipe.sideNotes.join(", ")}
              onChange={(e) => updateField("sideNotes", e.target.value)}
            />
            <button onClick={() => saveInput("side_note")}>
              Add Side Note
            </button>
            <ul>
              {recipe.sideNotes.map((n, idx) => (
                <li key={idx}>
                  {n}
                  <button onClick={() => onDelete("side_note", idx)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            <h2>Edit Instructions</h2>
            <input
              type="text"
              value={instructionInput}
              onChange={handleInstructionInputChange}
              placeholder="Add instructions"
            />
            <button onClick={() => saveInput("instruction")}>
              Add Instruction
            </button>
            <ol>
              {recipe.instructions.map((s, idx) => (
                <li key={idx}>
                  {s}
                  <button onClick={() => onDelete("instruction", idx)}>
                    Delete
                  </button>
                </li>
              ))}
            </ol>

            <div>
              <button onClick={saveChanges}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>

      <KoFi />
    </>
  );
}
