export default function useRouter() {
  const push = ({ state, url }: { state?: unknown; url?: string }) => {
    history.pushState(state, '', url);
  };
  return { push };
}
