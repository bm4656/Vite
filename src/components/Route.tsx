import { useContext } from 'react';
import { RouteContext } from './Router';

type Props = {
  path: string;
  component: React.ReactNode;
};

export default function Route({ path, component }: Props) {
  const { pathname } = useContext(RouteContext);
  if (pathname === path) return component;
}
