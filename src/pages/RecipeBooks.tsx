import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import KoFi from "../components/KoFi";

export default function RecipeBooks() {
  const navigate = useNavigate();

  const [recipeBooks, setRecipeBooks] = useState<
    { id: number; name: string }[]
  >([]);
  const [newBookName, setNewBookName] = useState("");

  const hasLoaded = useRef(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem("recipeBooks");
    if (storedBooks) {
      setRecipeBooks(JSON.parse(storedBooks));
    }
    hasLoaded.current = true;
  }, []);

  useEffect(() => {
    if (hasLoaded.current) {
      localStorage.setItem("recipeBooks", JSON.stringify(recipeBooks));
    }
  }, [recipeBooks]);

  function addRecipeBook() {
    if (newBookName.trim() === "") return;

    const newBook = {
      id: Date.now(),
      name: newBookName.trim(),
    };
    setRecipeBooks([...recipeBooks, newBook]);
    setNewBookName("");
  }

  function deleteRecipeBook(id: number) {
    setRecipeBooks(recipeBooks.filter((book) => book.id !== id));
  }

  return (
    <>
      <h1>Recipe Books</h1>

      <button onClick={() => navigate("/")}>Back to Main Menu</button>
      <div>
        <input
          type="text"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
          placeholder="New Recipe Book Name"
        />
        <button onClick={addRecipeBook}>Add Recipe Book</button>
      </div>

      <ul>
        {recipeBooks.map((book) => (
          <li key={book.id}>
            <button onClick={() => navigate(`/recipe-books/${book.id}`)}>
              {book.name}
            </button>
            <button onClick={() => deleteRecipeBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <KoFi />
    </>
  );
}
