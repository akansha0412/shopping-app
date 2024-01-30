import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";
import { Popover } from "@mui/material";
import { Typography } from "./DesignSystem/Typography";

const useStyles = makeStyles({
  userSettingContainer: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    fill: "#e7e7e7",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#272727",
      cursor: "pointer",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "poppins",
    fontWeight: 500,
    borderRadius: "50%",
    background: "#fda560",
    color: "#0f0f0f",
    fontSize: "12px",
    width: "28px",
    height: "28px",
    border: `2px solid #fd8121`,
  },
  popoverPaper: {
    background: "#272727",
    width: "280px",
  },
  profileData: {
    padding: "10px",
    textDecoration: "none",
    width: "100%",
    color: "#e7e7e7",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      color: "#e7e7e7",
    },
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
});

interface IProps {
  onSearch?: (value: string) => void;
}

interface IState {
  anchorEl: HTMLDivElement | null;
}

function getNameLetters(name: string) {
  const splitChannelName = name.split(" ");
  if (splitChannelName.length === 1) {
    return name.substring(0, 2);
  }
  const updatedName = splitChannelName.reduce(
    (acc, word) => `${acc}${word[0]}`,
    ""
  );
  if (updatedName.length <= 3) {
    return updatedName;
  }
  return updatedName.substring(0, 3);
}

export const NameLogo: React.FC<IProps> = ({ onSearch }) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, logout } = useUser();
  const text = getNameLetters(user?.name || "");
  const [state, setState] = useState<IState>({
    anchorEl: null,
  });

  const open = Boolean(state.anchorEl);

  function updateState(state: IState) {
    setState(state);
  }

  function handleOpen(e: React.MouseEvent<HTMLDivElement> | undefined) {
    if (!e) {
      return;
    }
    updateState({ ...state, anchorEl: e.currentTarget });
  }

  function renderPopoverElements() {
    return (
      <div
        className={classes.profileData}
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        <Typography type="bodyNormalDefault">Logout</Typography>
      </div>
    );
  }

  return (
    <>
      <div className={classes.userSettingContainer} onClick={handleOpen}>
        <div className={classes.container}>{text}</div>
      </div>
      <Popover
        open={open}
        onClose={() => updateState({ ...state, anchorEl: null })}
        anchorEl={state.anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={{ paper: classes.popoverPaper }}
      >
        {renderPopoverElements()}
      </Popover>
    </>
  );
};
