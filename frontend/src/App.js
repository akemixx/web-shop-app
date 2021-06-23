import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderPage from "./pages/OrderPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductPage from "./pages/ProductPage";
import ShippingAdressPage from "./pages/ShippingAdressPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfilePage from "./pages/UserProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import ProductsListPage from "./pages/admin/ProductsListPage";
import AdminRoute from "./components/AdminRoute";
import ProductEditPage from "./pages/admin/ProductEditPage";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              shop
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down" />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productsList">Products</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderHistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signOutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signIn">Sign in</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} exact />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/signUp" component={SignUpPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/shipping" component={ShippingAdressPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/orderHistory" component={OrderHistoryPage} />
          <PrivateRoute path="/profile" component={UserProfilePage} />
          <AdminRoute path="/productsList" component={ProductsListPage} />
          <AdminRoute path="/product/:id/edit" component={ProductEditPage} />
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
