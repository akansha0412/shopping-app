import { IResources } from "../../dataTypes/productType";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Typography } from "../DesignSystem/Typography";
import { Button } from "../DesignSystem/Button";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { addItemToCart } from "../../api/cart";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#1e1e1e",
    transition: "transform .3s",
    position: "relative",
    height: "300px",
    borderRadius: "8px",
    cursor: "pointer",
    outline: `2px solid #323232`,
    "&:hover": {
      backgroundColor: "#1e1e1e",
    },
  },
  img: {
    width: "100%",
    height: "140px",
    objectFit: "contain",
    background: " #323232",
  },
  details: {
    height: "calc(100% - 180px)",
    padding: "12px",
    backgroundColor: "#1e1e1e",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textColor: {
    color: "#e7e7e7",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  secondaryColor: {
    color: "#999",
  },
  disabledButton: {
    color: "#0f0f0f",
    backgroundColor: "#616161",
    "&:hover": {
      backgroundColor: "#616161",
    },
    cursor: "auto",
  },
});

interface IProps {
  product: IResources;
}

export const ProductCard: React.FC<IProps> = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();
  const { addToCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  function addToCartClick(
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) {
    setSubmitting(true);
    e.stopPropagation();
    addItemToCart(productId).then(() => {
      setSubmitting(false);
      addToCart({ id: productId, quantity: 1 });
    });
  }

  return (
    <div
      className={classes.card}
      onClick={() => history.push(`/products/${product.id}`)}
    >
      <img src={product.image} className={classes.img} />
      <div className={classes.details}>
        <Typography type="headingH3" className={classes.textColor}>
          {product.title}
        </Typography>
        <Typography type="bodyNormalDefault" className={classes.secondaryColor}>
          {`Category: ${product.category}`}
        </Typography>
        <Typography type="bodyNormalDefault" className={classes.textColor}>
          {`Rs ${product.price}`}
        </Typography>
        {product.stock === 0 ? (
          <Button className={classes.disabledButton}>Out of stock</Button>
        ) : (
          <Button
            onClick={(e) => addToCartClick(e, product.id)}
            disabled={submitting ? true : false}
          >
            {submitting ? "Loading...." : "Add to cart"}
          </Button>
        )}
      </div>
    </div>
  );
};
