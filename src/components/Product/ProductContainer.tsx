import { IProductResponse } from "../../dataTypes/productType";
import { makeStyles } from "@mui/styles";
import { Header } from "../Header";
import { ProductCard } from "./ProductCard";
import { Pagination } from "../DesignSystem/Pagination";
import { IState } from "../../dataLoaders/ProductLoader";

const useStyles = makeStyles({
  productContainer: {
    paddingTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: "12px",
    alignItems: "start",
    backgroundColor: "#0f0f0f",
  },
  mainDiv: {
    backgroundColor: "#0f0f0f",
  },
});

interface IProps {
  productsData: IProductResponse;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
  state: IState;
}

export const ProductContainer: React.FC<IProps> = ({
  productsData,
  onSearch,
  onPageChange,
  state,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.mainDiv}>
      <Header onSearch={onSearch} />
      <div className={classes.productContainer}>
        {productsData.resources.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        totalCount={productsData.count}
        page={state.page}
        rowsPerPage={state.size}
        onPageChange={onPageChange}
      />
    </div>
  );
};
