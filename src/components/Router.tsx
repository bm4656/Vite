import { createContext, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type RouteContextType = {
  pathname: string;
  setPathname: (newPath: string) => void;
};

export const RouteContext = createContext<RouteContextType>({
  pathname: '',
  setPathname: () => {},
});

export default function Router({ children }: Props) {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <RouteContext.Provider value={{ pathname, setPathname }}>
      {children}
    </RouteContext.Provider>
  );
}
