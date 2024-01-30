import { IResources } from "../../dataTypes/productType";
import { makeStyles } from "@mui/styles";
import { Header } from "../Header";
import { Typography } from "../DesignSystem/Typography";
import { Button } from "../DesignSystem/Button";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    gap: "25px",
    margin: "50px",
    border: "1px solid #999",
    borderRadius: "8px",
    "@media (max-width:600px)": {
      flexDirection: "column",
      margin: "unset",
      border: "unset",
    },
  },
  textDefault: {
    color: "#e7e7e7",
  },
  textSecondary: {
    color: "#999",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
  },
  img: {
    height: "500px",
  },
  cursorPntr: {
    cursor: "pointer",
  },
  breadCrumbs: {
    display: "flex",
    gap: "5px",
    padding: "20px 50px",
  },
  mainDiv: {
    backgroundColor: "#0f0f0f",
  },
  imgDiv: {
    "@media (max-width:600px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
});

interface IProps {
  product: IResources;
  addItem: (productId: number) => void;
}

export const ProductDetailContainer: React.FC<IProps> = ({
  product,
  addItem,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.mainDiv}>
      <Header />
      <div className={classes.breadCrumbs}>
        <Typography
          type="bodyNormalSmall"
          className={clsx(classes.textSecondary, classes.cursorPntr)}
          onClick={() => history.push("/products")}
        >
          Products
        </Typography>
        <Typography type="bodyNormalSmall" className={classes.textSecondary}>
          /
        </Typography>
        <Typography type="bodyNormalSmall" className={classes.textSecondary}>
          {product.title}
        </Typography>
      </div>
      <div className={classes.container}>
        <div className={classes.imgDiv}>
          <img src={product.image} className={classes.img}></img>
        </div>
        <div className={classes.details}>
          <Typography type="headingH1" className={classes.textDefault}>
            {product.title}
          </Typography>
          <Typography type="bodyNormalLarge" className={classes.textSecondary}>
            {`${product.category}`}
          </Typography>
          <Typography type="bodyNormalDefault" className={classes.textDefault}>
            {`Rs ${product.price}`}
          </Typography>
          <Typography type="headingH4" className={classes.textDefault}>
            {product.description}
          </Typography>
          <Typography
            type="bodyNormalDefault"
            className={classes.textSecondary}
          >
            {`Rating : ${product.rating.rate}/${product.rating.count}`}
          </Typography>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product.id);
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
