export default function Root() {
  return (
    <>
      <h1>root</h1>
      <button
        onClick={() => {
          history.pushState({ data: '/about' }, '', '/about');
        }}>
        about
      </button>
    </>
  );
}
