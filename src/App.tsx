import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { styled } from "@mui/system";
import { QueryClientProvider } from "react-query";
import { SignIn } from "./components/Login/signIn";
import { IState, ProductLoader } from "./dataLoaders/ProductLoader";
import { IProductResponse, IResources } from "./dataTypes/productType";
import { ProductContainer } from "./components/Product/ProductContainer";
import { queryClient } from "./utils/commonUtils";
import { ProductDetailsLoader } from "./dataLoaders/ProductDetailsLoader";
import { ProductDetailContainer } from "./components/Product/ProductDetailContainer";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";

const MyDiv = styled("div")({
  backgroundColor: "#0f0f0f",
  height: "100vh",
  // overflow: "hidden",
});

const App: React.FC = () => {
  return (
    <MyDiv>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CartProvider>
            <Router>
              <Switch>
                <Route path="/login" component={SignIn}></Route>
                <Route path="/products/:id">
                  <ProductDetailsLoader
                    render={(
                      product: IResources,
                      addItem: (productId: number) => void
                    ) => (
                      <ProductDetailContainer
                        product={product}
                        addItem={addItem}
                      />
                    )}
                  />
                </Route>
                <Route path="/products">
                  <ProductLoader
                    render={(
                      products: IProductResponse,
                      onSearch: (value: string) => void,
                      onPageChange: (page: number) => void,
                      state: IState
                    ) => (
                      <ProductContainer
                        productsData={products}
                        onSearch={onSearch}
                        onPageChange={onPageChange}
                        state={state}
                      />
                    )}
                  />
                </Route>
                <Redirect from="/" to="/products" />
              </Switch>
            </Router>
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </MyDiv>
  );
};

export default App;
