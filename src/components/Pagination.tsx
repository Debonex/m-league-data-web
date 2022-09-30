import { FC, useState } from "react";
import Button from "components/Button";
import Arrow from "components/Arrow";
import clsx from "clsx";

type PaginationProps = {
  count: number;
  onChange?: (count: number) => unknown;
  className?: string;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }).map((_, idx) => start + idx);

const Ellipsis: FC = () => (
  <div className="select-none px-2 text-primary-main">...</div>
);

const Pagination: FC<PaginationProps> = ({ count, onChange, className }) => {
  const [current, setCurrent] = useState(1);

  const changePage = (page: number) => {
    if (page === current) {
      return;
    }
    setCurrent(page);
    onChange?.(page);
  };

  const PaginationItem: FC<{ page: number }> = ({ page }) => {
    return (
      <Button
        onClick={() => changePage(page)}
        active={current === page}
        className="!p-2"
      >
        <div className="flex h-4 w-4 items-center justify-center">{page}</div>
      </Button>
    );
  };

  const paginationItems = (from: number, to: number) =>
    range(from, to).map((page) => <PaginationItem key={page} page={page} />);

  let pageItems;
  if (count < 7) {
    pageItems = paginationItems(1, count);
  } else if (current <= 3) {
    pageItems = [
      ...paginationItems(1, 5),
      <Ellipsis key={-1}></Ellipsis>,
      <PaginationItem key={count} page={count} />,
    ];
  } else if (current >= count - 2) {
    pageItems = [
      <PaginationItem key={1} page={1} />,
      <Ellipsis key={-1}></Ellipsis>,
      ...paginationItems(count - 4, count),
    ];
  } else {
    pageItems = [
      <PaginationItem key={1} page={1} />,
      <Ellipsis key={-1}></Ellipsis>,
      ...paginationItems(current - 1, current + 1),
      <Ellipsis key={-2}></Ellipsis>,
      <PaginationItem key={count} page={count} />,
    ];
  }

  return (
    <nav className={clsx("flex items-center", className)}>
      {count > 0 && (
        <Button
          className="!p-2"
          disabled={current === 1}
          onClick={() => changePage(1)}
        >
          <Arrow up={true} className="h-4 -rotate-90" />
        </Button>
      )}
      {pageItems}
      {count > 0 && (
        <Button
          className="!p-2"
          disabled={current === count}
          onClick={() => changePage(count)}
        >
          <Arrow up={true} className="h-4 rotate-90" />
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
