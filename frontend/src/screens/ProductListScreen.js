import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { addToCart, removeFromCart } from "../actions/cartActions";

import Rating from "../components/Rating";

function HomeScreen(props) {
  let { sq } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);

  useEffect(() => {
    if (sq && sq.trim() != "") {
      setSearchKeyword(sq);
      dispatch(listProducts(category, sq, sortOrder));
    }
  }, [sq]);

  const sortHandler = e => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 291,
      float: "left",
      width: "100%",
      margin: "10px 10px 10px 10px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      backgroundSize: "contain"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: "#3f51b5"
    },
    addToCart: {
      backgroundColor: "#3f51b5",
      width: "100% !important"
    }
  }));

  const classes = useStyles();

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          Sort By{" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {products.length > 0
            ? products.map(product => (
                <Card className={classes.root}>
                  <CardHeader
                    action={
                      <IconButton aria-label="FavoriteIcon">
                        <FavoriteIcon />
                      </IconButton>
                    }
                    title={product.name}
                    subheader={`Rs. ${product.price}`}
                  />
                  <Link to={"/product/" + product._id}>
                    <CardMedia
                      className={classes.media}
                      image={product.image}
                      title="Paella dish"
                    />
                  </Link>

                  <CardActions disableSpacing>
                    <Button
                      size="lg"
                      block
                      variant="contained"
                      color="primary"
                      className={classes.addToCart}
                      startIcon={<AddShoppingCartIcon />}
                      onClick={() => dispatch(addToCart(product._id, 1))}
                    >
                      Add To Cart
                    </Button>
                    {/* <IconButton style={{ marginLeft: "auto" }} aria-label="show more">
              <FavoriteIcon />
            </IconButton> */}
                    {/* <Rating
              value={product.rating || 2.5}
              text={product.numReviews || 3 + " reviews"}
            /> */}
                  </CardActions>
                </Card>
              ))
            : "Sorry No Match Found ...!!!"}
        </>
      )}
    </>
  );
}
export default HomeScreen;
