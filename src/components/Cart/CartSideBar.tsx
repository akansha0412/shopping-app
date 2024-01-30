import { Drawer } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Typography } from "../DesignSystem/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { CartLoader } from "../../dataLoaders/CartLoader";
import { ICartData, IItem } from "../../dataTypes/cartTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateQuantity } from "../../api/cart";

const useStyles = makeStyles({
  sidepanelContainer: {
    backgroundColor: "#1e1e1e",
    width: "700px",
    boxShadow: "-20px 0px 32px 0px rgba(0, 0, 0, 0.32)",
    border: `solid 1px rgba(255, 255, 255, 0.12)`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
    "@media (max-width:600px)": {
      width: "380px",
    },
  },
  containerHeader: {
    height: "64px",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    color: "#e7e7e7",
    justifyContent: "space-between",
    borderBottom: `1px solid rgba(255, 255, 255, 0.12)`,
  },
  closeIcon: {
    fill: "#e7e7e7",
    cursor: "pointer",
  },
  content: {
    height: "100%",
    overflow: "auto",
    color: "#e7e7e7",
    padding: "16px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cartDiv: {
    border: `1px solid rgba(255, 255, 255, 0.12)`,
    height: "100px",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    gap: "10px",
  },
  img: {
    height: "inherit",
    width: "200px",
    objectFit: "contain",
    background: "#f8f8f8",
    "@media (max-width:600px)": {
      width: "100px",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  icon: {
    fill: "#e7e7e7",
    marginLeft: "auto",
    cursor: "pointer",
  },
  quantityDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30px",
    height: "100px",
    alignItems: "center",
  },
  quantityTerms: {
    cursor: "pointer",
    border: "1px solid #999",
    width: "35px",
    height: "100%",
    padding: " 5px",
    fontWeight: 700,
    fontSize: "24px",
    textAlign: "center",
  },
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSideBar: React.FC<IProps> = ({ isOpen, onClose }) => {
  const classes = useStyles();

  function updateQuantity(
    id: number,
    quantity: number,
    type: string,
    updateItem: (productId: number, quantity: number) => void
  ) {
    let updatedQuantity = quantity;
    if (type === "inc") {
      updatedQuantity = quantity + 1;
    }
    if (type === "dec") {
      updatedQuantity = quantity - 1;
      updatedQuantity = updatedQuantity === 0 ? 1 : updatedQuantity;
    }
    updateItem(id, updatedQuantity);
  }

  function cartCard(
    cart: IItem,
    deleteItem: (productId: number) => void,
    updateItem: (productId: number, quantity: number) => void
  ) {
    return (
      <div className={classes.cartDiv}>
        <div className={classes.quantityDiv}>
          <Typography
            className={classes.quantityTerms}
            onClick={() =>
              updateQuantity(cart.id, cart.quantity, "inc", updateItem)
            }
          >
            +
          </Typography>
          <Typography
            className={classes.quantityTerms}
            onClick={() =>
              updateQuantity(cart.id, cart.quantity, "dec", updateItem)
            }
          >
            -
          </Typography>
        </div>
        <img src={cart.image} className={classes.img} />
        <div className={classes.details}>
          <Typography>{cart.title}</Typography>
          <Typography>{`Rs ${cart.price}`}</Typography>
          <Typography>{`Quantity ${cart.quantity}`}</Typography>
        </div>
        <DeleteIcon
          className={classes.icon}
          onClick={() => deleteItem(cart.id)}
        />
      </div>
    );
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className={classes.sidepanelContainer}>
        <div className={classes.containerHeader}>
          <Typography type="headingH2">{`My Bag`}</Typography>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
        </div>
        <div className={classes.content}>
          <CartLoader
            render={(
              cartDetail: ICartData,
              deleteItem: (productId: number) => void,
              updateItem: (productId: number, quantity: number) => void
            ) => {
              return (
                <>
                  {cartDetail.resources.map((cart) =>
                    cartCard(cart, deleteItem, updateItem)
                  )}
                </>
              );
            }}
          />
        </div>
      </div>
    </Drawer>
  );
};
