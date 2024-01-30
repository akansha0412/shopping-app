import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { Header } from "../Header";
import { SadSquareIcon } from "./Icons/SadSquareIcon";
import { Typography } from "./Typography";

const useStyles = makeStyles({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  textSecondary: {
    color: "#999",
  },
});

interface IProps {}

export const BadRequest: FC<IProps> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.mainDiv}>
        <SadSquareIcon />
        <Typography type="headingH1" className={classes.textSecondary}>
          Bad Request
        </Typography>
      </div>
    </>
  );
};
