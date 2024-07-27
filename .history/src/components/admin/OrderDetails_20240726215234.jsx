/* eslint-disable react/prop-types */
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from './OrderDetails.module.css'
function OrderDetails({item, back}) {
  return (
    <div
      className={`${styles.details} bg-card text-card-foreground p-8 rounded-lg shadow-lg max-w-4xl mx-auto`}
    >
      <div onClick={()=> back(false)} className="flex justify-between  mb-6">
        <KeyboardBackspaceIcon/>
      </div>
      <div className={styles.orderInfo}>
        <div>
          <h6 className="text-xl font-bold mb-2">Order Info</h6>
          <p className="text-sm">Order Id</p>
          <p className="text-muted-foreground text-lg">{item.id}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">
            Order Status: <span className="text-muted-foreground">{item.status}</span>
          </p>
          <p className="font-bold text-lg">
            Order Date:{" "}
            <span className="text-muted-foreground">{item.date.toLocaleString()}</span>
          </p>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className={`${styles.address} grid grid-cols-2 gap-6 mb-6`}>
        <div>
          <h5 className="text-xl font-bold mb-2">Bill From</h5>
          <p className="text-lg">{item.customer}</p>
          <span className="text-muted-foreground">{item?.email}</span>
          <p className="text-muted-foreground">
            {item.address.address}
          </p>
          <p className="text-muted-foreground">
            {item.address.city}
          </p>
          <p className="text-muted-foreground">
            {item.address.country}
          </p>
          <p className="text-muted-foreground">{item.phone}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <h5 className="text-xl font-bold mb-2">Bill To</h5>
          <p className="text-lg">Schoen, Conn and Mills</p>
          <span className="text-muted-foreground">
            rodriguez.trent@senger.com
          </span>
          <p className="text-muted-foreground">
            61 Johnson St. Shirley, NY 11967.
          </p>
          <p className="text-muted-foreground">+202-555-0170</p>
        </div>
      </div>
      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className={`${styles.header} bg-muted text-muted-foreground`}>
            <th className="p-3 border-b">#</th>
            <th className="p-3 border-b">Item Name</th>
            <th className="p-3 border-b">Unit Price</th>
            <th className="p-3 border-b">Unit</th>
            <th className="p-3 border-b">Cost</th>
          </tr>
        </thead>
        <tbody>
          {item.cart.map((product, idx) => (

          <tr key={idx} style={{borderColor: "black", borderBottom: "2px black"}}>
            <td className="p-3 border-b">{idx+1}</td>
            <td className="p-3 border-b">{pro}</td>
            <td className="p-3 border-b">$200</td>
            <td className="p-3 border-b">9</td>
            <td className="p-3 border-b">$1800</td>
          </tr>
          ))}
          <tr>
            <td className="p-3 border-b">2</td>
            <td className="p-3 border-b">Item 2</td>
            <td className="p-3 border-b">$300</td>
            <td className="p-3 border-b">15</td>
            <td className="p-3 border-b">$4500</td>
          </tr>
        </tbody>
      </table>
      <div className={`${styles.totalSection} flex justify-end`}>
        <div className={`${styles.tols} text-right`}>
          <p className={`${styles.total} font-bold text-lg`}>
            <strong>
                Sub Total:{" "}
            </strong>
            <span
              style={{ color: "gray", textAlign: "right" }}
              className="text-muted-foreground"
            >
              $6300
            </span>
          </p>
          <p className={`${styles.total} font-bold text-lg`}>
            <strong>
            Vat(%):{" "}
            </strong>
            <span
              style={{ color: "gray", textAlign: "right" }}
              className="text-muted-foreground"
            >
              10
            </span>
          </p>
          <p className={`${styles.total} font-bold text-lg`}>
            <strong>
            Grand Total:{" "}
            </strong>
            <strong
              style={{ color: "gray", textAlign: "right" }}
              className="text-muted-foreground"
            >
              $6930
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails
