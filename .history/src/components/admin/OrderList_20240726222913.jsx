// ProductList.js

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./OrderList.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
 const StyledGridOverlay = styled("div")(({ theme }) => ({
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   justifyContent: "center",
   height: "100%",
   "& .no-rows-primary": {
     fill: theme.palette.mode === "light" ? "#AEB8C2" : "#3D4751",
   },
   "& .no-rows-secondary": {
     fill: theme.palette.mode === "light" ? "#E8EAED" : "#1D2126",
   },
 }));

 function CustomNoRowsOverlay() {
   return (
     <StyledGridOverlay>
       <svg
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         width={96}
         viewBox="0 0 452 257"
         aria-hidden
         focusable="false"
       >
         <path
           className="no-rows-primary"
           d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
         />
         <path
           className="no-rows-primary"
           d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
         />
         <path
           className="no-rows-primary"
           d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
         />
         <path
           className="no-rows-secondary"
           d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
         />
       </svg>
       <Box sx={{ mt: 2 }}>No rows</Box>
     </StyledGridOverlay>
   );
 }
export default function OrderList() {

  const { orderList } = useSelector((state) => state.admin);
  const rows = orderList.map((item) => {
    return {
      id: item.orderId,
      customer: item.user,
      product: `${item.cart[0].product}${item.cart.length > 1 ? " ": ""}${
        item.cart.length > 1 ? "..." : ""
      }`,
      cart: item.cart,
      address: item.address,
      date: item.createdAt.toDate(),
      status: item.status,
      method: "Bank Transfer",
      price: item.total,
    };
  })
  console.log(rows)
 
  const [data, setData] = React.useState(rows);
  const [open, setOpen] = React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState(null)
  function handleEdit(id) {
    console.log(id);
    setSelectedRow(id);
    setOpen(true)
  }
  function handleSuccess(id) { 
    const success = data.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Approved",
            cart: item.cart.map((cart) => 
             { ...cart, quantity: cart.quantity - cart.amount };
            ),
          }
        : item
    );
    console.log(success)
    const successCart = data.map((item) => {
      item.id === id ? item.cart.map(cart => {return {...cart, quantity: cart.quantity - cart.amount }}) : item
    })
    console.log(successCart)
   }
  function handleCancel(id) { 
    const cancel = data.map((item) =>
      item.id === id ? { ...item, status: "Cancelled" } : item
    );
    setData(cancel)
   }
  console.log(data);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "customer", headerName: "Customers", width: 150 },
    { field: "product", headerName: "Product", width: 150 },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const isAvailable = params.value === "Approved";
        const isUnAvailable = params.value === "Cancelled";
        const isProcessing = params.value === "pending";
        return (
          <div
            className={`${styles.quantityCell} ${
              isAvailable && styles.available
            } ${isUnAvailable && styles.unavailable} ${
              isProcessing && styles.processing
            }`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "method",
      headerName: "Method",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <>
          <span
            aria-label="edit"
            style={{
              width: "100%",
              display: "inline-flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {params.row.status === "pending" && (
              <>
                <Tooltip title="mark as delivered">
                  <CheckIcon
                    onClick={() =>
                      handleSuccess(params.row.id)
                    }
                    className={styles.action}
                    style={{ color: "green" }}
                  />
                </Tooltip>
                <Tooltip title="mark as cancelled">
                  <CloseIcon
                    onClick={() => handleCancel(params.row.id)}
                    className={styles.action}
                    style={{ color: "red" }}
                  />
                </Tooltip>
              </>
            )}

            <ArrowRightAltIcon
              onClick={() => handleEdit(params.row)}
              className={styles.action}
            />
          </span>
        </>
      ),
    },
  ];

  return (
  <>
  {!open && <div
      style={{ height: 400 }}
      className={styles.productListContainer}
    >
      <DataGrid
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>}
    {open && <OrderDetails back={setOpen} item={selectedRow}/>}
  </>
   
  );
}
