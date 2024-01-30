import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { TextType } from "../../dataTypes/designTypes";

const useStyles = makeStyles({
  headingH1: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "24px",
  },
  headingH2: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "20px",
  },
  headingH3: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "18px",
  },
  headingH4: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "16px",
  },
  bodyBoldLarge: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "16px",
    letterSpacing: "0.08px",
  },
  bodyNormalLarge: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "16px",
    letterSpacing: "0.08px",
  },
  bodyBoldDefault: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.07px",
  },
  bodyNormalDefault: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "14px",
    letterSpacing: "0.07px",
  },
  bodyBoldSmall: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "12px",
    letterSpacing: "0.06px",
  },
  bodyNormalSmall: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "12px",
    letterSpacing: "0.06px",
  },
  bodyBoldXsmall: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: "11px",
    letterSpacing: "0.06px",
  },
  bodyNormalXsmall: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: "11px",
    letterSpacing: "0.06px",
  },
});

interface ITypography {
  type?: TextType;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Typography: FC<ITypography> = ({
  type,
  className,
  children,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes[type ? type : "bodyNormalDefault"],
        className && className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
