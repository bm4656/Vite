import useRouter from '../hook/useRouter';

export default function About() {
  const { push } = useRouter();
  return (
    <>
      <h1>about</h1>
      <button
        onClick={() => {
          push({ url: '/' });
        }}>
        go main
      </button>
    </>
  );
}
