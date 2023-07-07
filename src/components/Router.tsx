import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};
export default function Router({ children }: Props) {
  const pathname = window.location.pathname;
  useEffect(() => {
    console.log(window.location.pathname);
  }, [pathname]);
  return <>{children}</>;
}
