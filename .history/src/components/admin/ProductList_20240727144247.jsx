// ProductList.js

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./ProductList.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../server/firebase/firebaseConfig";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { toaster } from "evergreen-ui";
import { deleteObject, listAll, ref } from "firebase/storage";
import Spinner from "../reuseable/spinner/Spinner";
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
export default function ProductList() {
  const {productList} = useSelector(state => state.admin)
  const [dataSet, setDataSet] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleEdit(id) {
    console.log(id);
  }
  const handleRowUpdate = async ({ id, ...updatedRow }) => {
    console.log(id, updatedRow)
    // Implement your save/update logic here (e.g., Firebase Firestore update)
    // You can use the updatedRow object to get the modified data.
    // Example: await mySaveOnServerFunction(updatedRow);
  };
  React.useEffect(() => {
    const productCollectionRef = collection(db, "products");

    const unsubscribe = onSnapshot(productCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setDataSet(newData);
    });

    return () => {
      // Cleanup function: Unsubscribe from the snapshot listener
      unsubscribe();
    };
  }, []);
  console.log(productList)

  async function handleDelete(id, product) {
    const productStorageRef = ref(storage, `products/${product}`);
    try {
      setLoading(true);
      await deleteDoc(doc(db, "products", product));

      // Check if the file exists before attempting to delete it
      if (productStorageRef) {
        const res = await listAll(productStorageRef);
        await Promise.all(
          res.items.map(async (item) => {
            await deleteObject(
              ref(storage, `products/${product}/${item.name}`)
            );
          })
        );
      }
      setLoading(false);
      setDataSet((prev) => prev.filter((item) => item.id !== id));
      toaster.success("Deleted successfully");
    } catch (error) {
      setLoading(false);
      toaster.danger(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "product", headerName: "Product", editable: true, width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      editable: true,
      width: 150,
      renderCell: (params) => {
        const isAvailable = params.value > 0;
        return (
          <div
            className={`${styles.quantityCell} ${
              isAvailable ? styles.available : styles.unavailable
            }`}
          >
            {params.value > 0 && `${params.value} Available`}
            {params.value < 1 && `Unavailable`}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <>
          <span
            aria-label="edit"
            style={{ width: "100%", display: "inline-flex", gap: "10px" }}
          >
            <DeleteIcon onClick={handleClickOpen} className={styles.action} />
            <ArrowRightAltIcon
              onClick={() => handleEdit(params.row)}
              className={styles.action}
            />
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle> */}
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={() => handleDelete(params.row.id, params.row.product)}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];

  return (
    <div className={styles.productListContainer}>
      {loading && <Spinner />}
      <DataGrid
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        rows={dataSet}
        columns={columns}
        isCellEditable={(params) => params.row.quantity < 1}
        pageSize={10}
        onRowEditComm={handleRowUpdate}
      />
    </div>
  );
}
