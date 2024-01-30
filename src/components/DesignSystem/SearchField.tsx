import { InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles({
  searchField: {
    width: "100%",
    "& .now-MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "4px",
        border: `solid 1px #999`,
      },
      "&.Mui-focused fieldset": {
        borderWidth: "1px",
        borderColor: "#e7e7e7",
      },
    },
  },
  searchInputField: {
    padding: "0 10px 0 12px",
    color: "#e7e7e7",
    border: "1px solid #999",
  },
  searchIcon: {
    fill: "#e7e7e7",
    width: "20px",
    cursor: "pointer",
  },
  closeIcon: {
    cursor: "pointer",
    fontSize: "16px",
    width: "16px",
    fill: "#e7e7e7",
  },
  collapsedPaddingRight: {
    paddingRight: "0px",
  },
});

export const SearchField: FunctionComponent<ISearchFieldProps> = ({
  onSearch,
  placeholder,
  collapsed,
  value,
  disabled,
  autocomplete = "on",
}) => {
  const ref = useRef<Subject<string>>();
  const [state, setState] = useState({
    search: value ? value : "",
    collapsed: collapsed,
  });
  const classes = useStyles();
  const textFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current = new Subject<string>();
    ref.current
      .pipe(
        tap((search) => {
          setState((state) => ({ ...state, search }));
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((search) => {
        onSearch(search);
      });
    return () => ref.current?.unsubscribe();
  }, [onSearch]);

  useEffect(() => {
    if (!value) setState((pre) => ({ ...pre, search: "" }));
  }, [value]);

  function handleClearSearch() {
    if (collapsed) {
      setState({ search: "", collapsed: true });
      onSearch("");
      return;
    }
    setState({ ...state, search: "" });
    onSearch("");
    if (textFieldRef.current !== null) textFieldRef.current.focus();
  }

  function handleExpandSearchbox() {
    if (state.collapsed && textFieldRef.current !== null && collapsed) {
      setState((state) => ({ ...state, collapsed: false }));
      textFieldRef.current.focus();
    }
  }

  function getInputStyles() {
    if (state.collapsed) {
      return { padding: "6px 14px 6px 0px", width: "0px", paddingRight: "0px" };
    }
    return { padding: "6px 14px 6px 0px" };
  }

  return (
    <TextField
      id="searchField"
      value={state.search}
      onChange={(e) => ref.current?.next(e.target.value)}
      variant="outlined"
      placeholder={placeholder}
      className={classes.searchField}
      disabled={disabled}
      autoComplete={autocomplete}
      onBlur={() => {
        if (state.search.length === 0 && collapsed) {
          setState((state) => ({ ...state, collapsed: true }));
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              className={classes.searchIcon}
              onClick={handleExpandSearchbox}
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <div className={clsx(!state.collapsed && classes.closeIcon)}>
              {state.search && (
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={handleClearSearch}
                />
              )}
            </div>
          </InputAdornment>
        ),
        classes: {
          root: clsx(
            classes.searchInputField,
            state.collapsed && classes.collapsedPaddingRight
          ),
        },
      }}
      inputProps={{
        style: getInputStyles(),
        ref: textFieldRef,
      }}
      data-testid="search-field"
    />
  );
};

type onOff = "on" | "off";
interface ISearchFieldProps {
  onSearch: (searchTerm: string) => void;
  placeholder: string;
  collapsed: boolean;
  value?: string;
  disabled?: boolean;
  autocomplete?: onOff;
}
