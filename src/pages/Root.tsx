import useRouter from '../hook/useRouter';

export default function Root() {
  const { push } = useRouter();
  return (
    <>
      <h1>root</h1>
      <button
        onClick={() => {
          push({ url: '/about' });
        }}>
        about
      </button>
    </>
  );
}
