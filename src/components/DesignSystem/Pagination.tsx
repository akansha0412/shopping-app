import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { FunctionComponent } from "react";
import { ArrowIcon } from "./Icons/ArrowIcon";
import { LastPageIcon } from "./Icons/LastPageIcon";
import { Typography } from "./Typography";

const ROWS_PER_PAGE_OPTIONS = [
  {
    id: "15",
    name: "15",
  },
  {
    id: "20",
    name: "20",
  },
  {
    id: "50",
    name: "50",
  },
  {
    id: "100",
    name: "100",
  },
];

enum PageChangeType {
  PreviousPage = "PREVIOUS_PAGE",
  NextPage = "NEXT_PAGE",
  FirstPage = "FIRST_PAGE",
  LastPage = "LAST_PAGE",
}

const MIN_PAGE_COUNT = 1;

const useStyles = makeStyles((theme) => ({
  rowsPerPageSelect: {
    margin: "8px",
    color: "#e7e7e7",
  },
  icon: {
    fill: "#e7e7e7",
    paddingBottom: "6px",
    width: "16px",
    transform: "unset",
  },
  activePage: {
    borderRadius: "4px",
    padding: "4px 8px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  inActivePage: {
    padding: "4px 8px",
    cursor: "pointer",
  },
  pageIconButton: {
    color: "#e7e7e7",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    "&:disabled": {
      opacity: "0.25",
      pointerEvents: "none",
    },
  },
  navigationIconButton: {
    fill: "#fff",
    display: "flex",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#e7e7e7",
    marginLeft: "auto",
    marginTop: "20px",
  },
  selectElement: {
    color: "#e7e7e7",
    padding: "unset",
    border: "unset",
  },
  outlined: {
    padding: "10px",
  },
  formControl: {
    margin: "8px",
    minWidth: "65px",
  },
  forwardIcon: {
    cursor: "pointer",
    marginLeft: "14px",
    height: "8px",
    width: "8px",
  },
  fastForwardIcon: {
    transform: "rotate(180deg)",
    cursor: "pointer",
  },
  backwardIcon: {
    transform: "rotate(180deg)",
    cursor: "pointer",
    marginRight: "14px",
    height: "8px",
    width: "8px",
  },
  fastBackwardIcon: {
    cursor: "pointer",
  },
  paginationSelectField: {
    marginLeft: "30px",
    marginRight: "8px",
  },
  paginationSelect: {
    width: "55px",
  },
  navIcons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  popoverWidth: {
    width: "30px",
  },
}));

const getLastPage = (totalRows: number, rowsPerPage: number) => {
  return Math.ceil(totalRows / rowsPerPage);
};

const setPreviousPageNavigationDisable = (
  firstPage: number,
  pageNumber: number
) => {
  if (pageNumber === firstPage) {
    return true;
  }
  return false;
};

const setNextPageNavigationDisable = (lastPage: number, pageNumber: number) => {
  if (pageNumber === lastPage) {
    return true;
  }
  return false;
};

interface IPagination {
  rowsPerPage: number;
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FunctionComponent<IPagination> = (props) => {
  const classes = useStyles();
  const maxPageCount = getLastPage(props.totalCount, props.rowsPerPage);
  const previousPageNavigationDisabled = setPreviousPageNavigationDisable(
    MIN_PAGE_COUNT,
    props.page
  );
  const nextPageNavigationDisabled = setNextPageNavigationDisable(
    maxPageCount,
    props.page
  );

  const handlePageChange = (pageType: PageChangeType) => {
    switch (pageType) {
      case PageChangeType.NextPage: {
        const nextPage = props.page + 1;
        if (nextPage <= maxPageCount) {
          props.onPageChange(nextPage);
        }
        return;
      }
      case PageChangeType.PreviousPage: {
        const previousPage = props.page - 1;
        if (previousPage >= MIN_PAGE_COUNT) {
          props.onPageChange(previousPage);
        }
        return;
      }
      case PageChangeType.LastPage: {
        props.onPageChange(maxPageCount);
        return;
      }
      case PageChangeType.FirstPage: {
        props.onPageChange(MIN_PAGE_COUNT);
        return;
      }
    }
  };

  function getPageNumbers() {
    const allPageNumbers = [];
    const elementsCount = 7;
    let number = 1;
    for (let i = 0; i < elementsCount; i++) {
      if (maxPageCount > elementsCount) {
        if (props.page < 5) {
          if (i === elementsCount - 2) {
            allPageNumbers.push("...");
          } else if (i === elementsCount - 1) {
            allPageNumbers.push(maxPageCount);
          } else {
            allPageNumbers.push(number);
            number = number + 1;
          }
        } else if (props.page > maxPageCount - 4) {
          if (i === 1) {
            allPageNumbers.push("...");
            number = number + (maxPageCount - 6);
          } else if (i === 0) {
            allPageNumbers.push(number);
            number = number + 1;
          } else {
            allPageNumbers.push(number);
            number = number + 1;
          }
        } else {
          if (i === 0) {
            allPageNumbers.push(number);
            number = number + 1;
          } else if (i === 1) {
            allPageNumbers.push("...");
            number = props.page - 1;
          } else if (i === elementsCount - 2) {
            allPageNumbers.push("...");
          } else if (i === 6) {
            allPageNumbers.push(maxPageCount);
            break;
          } else {
            allPageNumbers.push(number);
            number = number + 1;
          }
        }
      } else {
        if (i < maxPageCount) allPageNumbers.push(i + 1);
      }
    }
    const pageNumberElements: React.ReactNode[] = [];
    allPageNumbers.forEach((pageNumber, index) => {
      pageNumberElements.push(
        <button
          className={clsx(classes.iconButton, classes.pageIconButton)}
          onClick={() => props.onPageChange(Number(pageNumber))}
          key={pageNumber.toString() + index.toString()}
          disabled={pageNumber === "..."}
        >
          <Typography
            type={
              pageNumber === props.page
                ? "bodyBoldDefault"
                : "bodyNormalDefault"
            }
            className={
              pageNumber === props.page
                ? classes.activePage
                : classes.inActivePage
            }
          >
            {pageNumber}
          </Typography>
        </button>
      );
    });
    return pageNumberElements;
  }

  return (
    <div className={classes.container}>
      <div className={classes.navIcons}>
        <button
          disabled={previousPageNavigationDisabled}
          className={clsx(classes.iconButton, classes.navigationIconButton)}
          onClick={() => handlePageChange(PageChangeType.FirstPage)}
        >
          <LastPageIcon />
        </button>
        <button
          disabled={previousPageNavigationDisabled}
          className={clsx(classes.iconButton, classes.navigationIconButton)}
          onClick={() => handlePageChange(PageChangeType.PreviousPage)}
        >
          <ArrowIcon className={classes.backwardIcon} />
        </button>
      </div>
      {getPageNumbers()}
      <div className={classes.navIcons}>
        <button
          disabled={nextPageNavigationDisabled}
          className={clsx(classes.iconButton, classes.navigationIconButton)}
          onClick={() => handlePageChange(PageChangeType.NextPage)}
        >
          <ArrowIcon className={classes.forwardIcon} />
        </button>
        <button
          disabled={nextPageNavigationDisabled}
          className={clsx(classes.iconButton, classes.navigationIconButton)}
          onClick={() => handlePageChange(PageChangeType.LastPage)}
        >
          <LastPageIcon className={classes.fastForwardIcon} />
        </button>
      </div>
    </div>
  );
};
