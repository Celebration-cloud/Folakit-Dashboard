import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useWidthSize from "../reuseable/width/useWidthSize";
import Draw from "./Draw";
import ProductList from "./ProductList";
import NewProduct from "./NewProduct";
import CustomerList from "./CustomerList";
import OrderList from "./OrderList";
const drawerWidth = 240;
let menuWidth;
const openedMixin = (theme) => ({
  top: "0px",
  height: "100%",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width:
    menuWidth < 500
      ? `calc(${theme.spacing(0)} + 1px)`
      : ` calc(${theme.spacing(8)} + 5px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminDashboardNav() {
  const theme = useTheme();
  const {width} = useWidthSize()
  const [open, setOpen] = React.useState(false);
  const [outlet, setOutlet] = React.useState("Product List");
  const [opens, setOpens] = React.useState(false);
  const [opens1, setOpens1] = React.useState(false);
  const [opens2, setOpens2] = React.useState(false);
  const dashMenu = ["Customers", "Products", "Orders", "Dashboard"];
  menuWidth = width
  const subMenu = [
    ["Customer's List"],
    ["Product List",  "New Product"],
    ["Order List"]
  ]
  React.useCallback(
    () => {
      if(width > 900){
    setOpen(true)
  }else{
    setOpen(false)
  }
    },
    [width],
  )
  React.useEffect(() => {
     if (width > 900) {
       setOpen(true);
     }else{
      setOpen(false)
     }
  
  }, [width])
  
  
  
  const handleClick = (id) => {
    if(id === 0){

      setOpens(!opens);
    }
    if(id === 1){

      setOpens1(!opens1);
    }
    if(id === 2){

      setOpens2(!opens2);
    }
  };
  const sect = (id)=> {
    if (id === 0) {
      return opens
    }
    if (id === 1) {
      return opens1
    }
    if (id === 2) {
      return opens2
    }
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Folakits
          </Typography>
        </Toolbar>
      </AppBar>
      <Draw
        handleDrawerClose={handleDrawerClose}
        sect={sect}
        handleClick={handleClick}
        subMenu={subMenu}
        theme={theme}
        Drawer={Drawer}
        DrawerHeader={DrawerHeader}
        open={open}
        width={width}
        outlet={outlet}
        opens={opens}
        setOutlet={setOutlet}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: "100%" }}>
        <DrawerHeader />
        {outlet === "Customer's List" && (
          <div>
            <h6>{outlet}</h6>
            <CustomerList />
          </div>
        )}
        {outlet === "Product List" && (
          <div>
            <h6>{outlet}</h6>
            <br />
            <ProductList />
          </div>
        )}
        {outlet === "New Product" && (
          <div>
            <h6>{outlet}</h6>
            <br />
            <NewProduct />
          </div>
        )}
        {outlet === "Order List" && (
          <div>
            <h6>{outlet}</h6>
            
            <OrderList />
          </div>
        )}
        {outlet === "Order List" && (
          <div>
            <h6>{outlet}</h6>
            <OrderList />
          </div>
        )}
      </Box>
    </Box>
  );
}
