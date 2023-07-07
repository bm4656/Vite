import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};
export default function Router({ children }: Props) {
  return <>{children}</>;
}
