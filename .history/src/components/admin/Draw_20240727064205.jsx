/* eslint-disable react/prop-types */
import React from 'react'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import CircleIcon from "@mui/icons-material/Circle";
import FolderIcon from "@mui/icons-material/Folder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from '@mui/icons-material/Dashboard';
function Draw({
  handleDrawerClose,
  sect,
  handleClick,
  subMenu,
  theme,
  Drawer,
  DrawerHeader,
  open,
  width,
  setOutlet,
}) {
  function arrow(id){
    return sect(id) ? <ExpandLess /> : <ExpandMore />;
  }
  return (
    <Drawer variant="permanent"  open={open}>
      <DrawerHeader
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Folakits Admin</Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleClick(3)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
              {open && arrow(3)}
            </ListItemButton>
        {["Customers", "Products", "Orders"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => handleClick(index)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index === 0 && <PeopleIcon />}
                {index === 1 && <ShoppingCartIcon />}
                {index === 2 && <FolderIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              {open && arrow(index)}
            </ListItemButton>
            <Collapse in={sect(index)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subMenu[index].map((item, idx) => (
                  <ListItemButton
                    key={idx}
                    onClick={() => {
                      setOutlet(item);
                      handleDrawerClose()
                      if (width < 500) {
                        handleClick();
                      }
                    }}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <CircleIcon sx={{ width: "10px" }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Draw
