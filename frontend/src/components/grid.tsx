
import clsx from "clsx";

type GridProps = {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
};

export function Grid({ children, cols = 3 }: GridProps) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 md:grid-cols-2",
        cols === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}