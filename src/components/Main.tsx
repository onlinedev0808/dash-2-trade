import type { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = ({ meta, children }: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {meta}

    <div className="mx-auto max-w-screen-md">
      <header>Header content here</header>

      <div>{children}</div>

      <footer>Footer content here</footer>
    </div>
  </div>
);

export { Main };
