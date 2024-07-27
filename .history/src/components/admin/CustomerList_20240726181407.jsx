// ProductList.js
import img1 from '/public/gown.png'
import { DataGrid } from "@mui/x-data-grid";
import styles from "./CustomerList.module.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomerProfile from './CustomerProfile';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function CustomerList() {
const {customerList} = useSelector(state => state.admin)
const customerRows = customerList.map((item) => {
  return {
    id: item.id,
    address: add
    name: item.user_name,
    email: item.email,
    phone: item.phone_number
  }
})
console.log(customerRows)
  const rows = [
    {
      id: 1,
      address: "Lorem ipsum dolor sit amet...",
      name: "John Doe",
      email: "ckadkn@gmail.com",
      phone: "1234567890",
    },
    {
      id: 2,
      address: "Lorem ipsum dolor sit amet...",
      name: "Jane Doe",
      email: "ckadkn@gmail.com",
      phone: "1234567890",
    },
    {
      id: 3,
      address: "Lorem ipsum dolor sit amet...",
      name: "John Doe",
      email: "ckadkn@gmail.com",
      phone: "1234567890",
    },
    {
      id: 4,
      address: "Lorem ipsum dolor sit amet...",
      name: "Jane Doe",
      email: "ckadkn@gmail.com",
      phone: "1234567890",
    },
    // Add more products as needed
  ];
  const [data, setData] = useState(rows);
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(null)
  function handleEdit(item) {
    console.log(item);
    setDetails(item)
    setOpen(true)
  }
  console.log(data);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <img src={img1} width={30} height={30} alt=''/><span>{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Preview",
      width: 200,
      renderCell: (params) => (
        <>
          <span
            aria-label="edit"
            style={{ width: "100%", display: "inline-flex", gap: "10px" }}
          >
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
    <div className={styles.productListContainer}>
      {open && (
        <CustomerProfile setOpen={setOpen} details={details}/>
      )}
      {!open && (
        <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
      )}
      
    </div>
  );
}
