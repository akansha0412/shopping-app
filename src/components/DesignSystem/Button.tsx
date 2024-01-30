import { Button as MuiButton, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { FC } from "react";

const useStyles = makeStyles({
  btn: {
    borderRadius: "4px",
    fontWeight: 600,
    color: "#0f0f0f",
    backgroundColor: "#fda560",
    "&:hover": {
      backgroundColor: "#fd8121",
    },
    height: "32px",
    textTransform: "capitalize",
  },
});

interface IButtonProps extends ButtonProps {
  className?: string;
}

export const Button: FC<IButtonProps> = (props) => {
  const { className, children, ...rest } = props;
  const classes = useStyles();

  function renderBtnContent() {
    return (
      <>
        <div>{children}</div>
      </>
    );
  }

  return (
    <MuiButton {...rest} className={clsx(classes.btn, className)}>
      {renderBtnContent()}
    </MuiButton>
  );
};
