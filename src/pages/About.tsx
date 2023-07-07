export default function About() {
  return (
    <>
      <h1>about</h1>
      <button
        onClick={() => {
          history.pushState({ data: '/' }, '', '/');
        }}>
        go main
      </button>
    </>
  );
}
