import { makeStyles } from "@mui/styles";
import { Typography } from "./DesignSystem/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "./DesignSystem/Button";
import { SearchField } from "./DesignSystem/SearchField";
import { useHistory } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { CartSideBar } from "./Cart/CartSideBar";
import { useUser } from "../contexts/UserContext";
import { NameLogo } from "./NameLogo";

const useStyles = makeStyles({
  headerDiv: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: "0px 20px",
  },
  leftDiv: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  icon: {
    fill: "#e7e7e7",
    cursor: "pointer",
  },
  textColor: {
    color: "#e7e7e7",
  },
  posRel: {
    position: "relative",
  },
  count: {
    position: "absolute",
    background: "rgba(247,45,45,.986)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#e7e7e7",
    width: "20px",
    height: "20px",
    fontSize: "11px",
    fontWeight: 700,
    right: "90px",
    top: "4px",
  },
});

interface IProps {
  onSearch?: (value: string) => void;
}

export const Header: React.FC<IProps> = ({ onSearch }) => {
  const classes = useStyles();
  const history = useHistory();
  const { cartState } = useCart();
  const { user } = useUser();
  const [isCartClicked, setIsCartClicked] = useState(false);

  return (
    <div className={classes.headerDiv}>
      <div className={classes.leftDiv}>
        {onSearch && (
          <SearchField
            placeholder="Search"
            onSearch={onSearch}
            collapsed={false}
          />
        )}
        <span
          className={classes.posRel}
          onClick={() => cartState.items.length > 0 && setIsCartClicked(true)}
        >
          <ShoppingCartIcon className={classes.icon} />
        </span>
        {cartState.items.length > 0 && (
          <span className={classes.count}>{cartState.items.length}</span>
        )}
        {user && user.name ? (
          <NameLogo />
        ) : (
          <Button onClick={() => history.push("/login")}>Login</Button>
        )}
      </div>
      <CartSideBar
        isOpen={isCartClicked}
        onClose={() => setIsCartClicked(false)}
      />
    </div>
  );
};
