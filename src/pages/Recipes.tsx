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

export default function RecipeBookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<RecipeBook | null>(null);
  const [newRecipeName, setNewRecipeName] = useState("");

  // Load the book and its recipes
  useEffect(() => {
    console.log("current list:", localStorage.getItem("recipeBooks"));
    const storedBooks = localStorage.getItem("recipeBooks");
    if (!storedBooks) return;

    const books: RecipeBook[] = JSON.parse(storedBooks);

    const found = books.find((b) => b.id === Number(id));

    // If the book exists but has no recipes field, add it
    if (found && !found.recipes) {
      found.recipes = [];
    }

    setBook(found || null);
  }, [id]);

  if (!book) {
    return (
      <>
        <h1>Recipe Book Not Found</h1>
        <button onClick={() => navigate("/recipe-books")}>Back</button>
      </>
    );
  }

  function saveBook(updatedBook: RecipeBook) {
    const storedBooks = localStorage.getItem("recipeBooks");
    if (!storedBooks) return;

    const books: RecipeBook[] = JSON.parse(storedBooks);

    const updatedBooks = books.map((b) =>
      b.id === updatedBook.id ? updatedBook : b,
    );

    localStorage.setItem("recipeBooks", JSON.stringify(updatedBooks));
  }

  function addRecipe() {
    if (newRecipeName.trim() === "") return;

    const newRecipe: Recipe = {
      name: newRecipeName.trim(),
      ingredients: [],
      sideNotes: [],
      instructions: [],
    };

    const updatedBook = {
      ...book,
      recipes: [...book.recipes, newRecipe],
    };

    setBook(updatedBook);
    saveBook(updatedBook);
    setNewRecipeName("");
  }

  function deleteRecipe(index: number) {
    const updatedBook = {
      ...book,
      recipes: book.recipes.filter((_, i) => i !== index),
    };

    setBook(updatedBook);
    saveBook(updatedBook);
  }

  return (
    <>
      <h1>{book.name}</h1>

      <button onClick={() => navigate("/recipe-books")}>Back to Books</button>

      <div>
        <input
          type="text"
          value={newRecipeName}
          onChange={(e) => setNewRecipeName(e.target.value)}
          placeholder="New Recipe Name"
        />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>

      <ul>
        {book.recipes.map((recipe, index) => (
          <li key={index}>
            <button
              onClick={() =>
                navigate(`/recipe-books/${book.id}/recipes/${index}`)
              }
            >
              {recipe.name}
            </button>
            <button onClick={() => deleteRecipe(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <KoFi />
    </>
  );
}
