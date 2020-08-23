import React from "react";
import { Route } from "react-router-dom";
import ProductListScreen from "../screens/ProductListScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import SigninScreen from "../screens/SigninScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InventoryScreen from "../screens/InventoryScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
export default function Routes() {
  return (
    <>
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/admin/inventory" component={InventoryScreen} />
      <Route path="/admin/orders" component={OrdersScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/signup" component={SignUpScreen} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/category/:id" component={ProductListScreen} />
      <Route path="/search/:sq" component={ProductListScreen} />
      <Route path="/" exact={true} component={ProductListScreen} />
    </>
  );
}
