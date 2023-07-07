type Props = {
  path: string;
  component: React.ReactNode;
};

export default function Route({ path, component }: Props) {
  const pathname = window.location.pathname;
  if (pathname === path) return component;
}
