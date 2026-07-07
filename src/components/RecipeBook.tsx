type RecipeBookProps = {
  label: string;
  onClick: () => void;
};

export default function RecipeBook({ label, onClick }: RecipeBookProps) {
  return (
    <>
      <h1>{label}</h1>
      <button onClick={onClick}>Back</button>
    </>
  );
}
