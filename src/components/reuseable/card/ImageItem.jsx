/* eslint-disable react/prop-types */
import { useState } from 'react'
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Content from '../../details/Content';
import { useDispatch, useSelector } from 'react-redux';
import { userWishlist } from '../../../store/actions/userActions';
import { toaster } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function ImageItem({ product, wishlistRef }) {
    const { session } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const cardStyle = {
    width: "100%",
    height: "250px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
  };
  
  const imageStyle = {
    width: "100%",
    height: "100%",
    transition: "opacity 0.3s ease",
    opacity: product.quantity > 0 ? (product.img[1] && isHovered ? 0 : 1) : 0.3,
  };
  const hoverImageStyle = {
    ...imageStyle,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: product.quantity > 0 && product.img[1] && isHovered ? 1 : 0,
  };
  
  const outStock = {
    ...imageStyle,
    position: "absolute",
    top: 0,
    left: 0,
    opacity: product.quantity === 0 ? 1 : 0,
  };
  
  const iconStyle = {
    position: "absolute",
    display: "inline-flex",
    flexDirection: "column",
    padding: "10px",
    gap: "10px",
    top: "0px",
    right: "0px",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease",
  };
  
  const { userData } = useSelector((state) => state.user);

  const exists =
    wishlistRef && wishlistRef.current?.find((item) => item.product === product.product) !==
    undefined;
  function handleWish(item) {
    if (session){
      if (userData) {
    // Check if the item is already in the wishlist
    const existingIndex = wishlistRef.current.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingIndex !== -1) {
      // Item is already in the wishlist, remove it
      wishlistRef.current.splice(existingIndex, 1);
      dispatch(userWishlist(wishlistRef.current, userData[0].user_name));
      toaster.success("Removed from wishlist");
    } else {
      // Item is not in the wishlist, add it
      wishlistRef.current = [...wishlistRef.current, item];
      dispatch(userWishlist(wishlistRef.current, userData[0].user_name));
      toaster.success("Added to wishlist");
    }
  }
    } else{
      navigate('/log')
    }
  
}

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.quantity > 0 ? (
        <>
          <img
            src={product?.img[0]} // Replace with the initial image path
            alt="Initial"
            style={imageStyle}
          />
          {product?.img[1] && (
            <img
              src={product.img[1]} // Replace with the hover image path
              alt="Hover"
              style={hoverImageStyle}
            />
          )}
        </>
      ) : (
        <>
          <img
            src={product?.img[0]} // Replace with the initial image path
            alt="Initial"
            style={imageStyle}
          />
          <div
            style={{
              ...outStock,
              background: "",
              display: "inline-flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              disabled
              style={{
                backgroundColor: "transparent",
                color: "black",
                border: "2px solid black",
              }}
            >
              Out of Stock
            </button>
          </div>
        </>
      )}

      <div style={iconStyle}>
        {/* Render the heart with ECG line icon here */}
        {product.quantity > 0 && (
          <Tooltip title="Add to Cart" placement="left-end">
            <i
              style={{
                backgroundColor: "white",
                padding: "6px",
                borderRadius: "100%",
              }}
              className="fa-solid fa-cart-shopping"
            ></i>
          </Tooltip>
        )}
        <Tooltip title="View Product" placement="left-end">
          <i
            style={{
              backgroundColor: "white",
              padding: "6px",
              borderRadius: "100%",
            }}
            onClick={() => navigate(`/Shop/${product?.product}`)}
            className="fa-solid fa-link"
          ></i>
        </Tooltip>

        <Tooltip title="Add to Wishlist" placement="left-end">
          {!exists ? (
            <i
              style={{
                backgroundColor: "white",
                padding: "6px",
                borderRadius: "100%",
              }}
              onClick={() => handleWish(product)}
              className="fa-regular fa-heart"
            ></i>
          ) : (
            <i
              style={{
                backgroundColor: "white",
                padding: "6px",
                borderRadius: "100%",
              }}
              onClick={() => handleWish(product)}
              className="fa-solid fa-heart"
            ></i>
          )}

          {/*  */}
        </Tooltip>

        <Tooltip title="Preview" placement="left-end">
          <i
            onClick={handleClickOpen}
            style={{
              backgroundColor: "white",
              padding: "6px",
              borderRadius: "100%",
            }}
            className="fa-solid fa-maximize"
          ></i>
        </Tooltip>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth={"lg"}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {product.product}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Content preview={product.product} />
          </DialogContent>
        </BootstrapDialog>
      </div>
    </div>
  );
}

export default ImageItem
