/* eslint-disable react/prop-types */
import CarouselImage from "./CarouselImage";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styles from "./Details.module.css";
function ProductDetails({back, productDetails}) {
  return (
    
    <div className={styles.content}>
      <div onClick={() => back(false)} className="flex justify-between  mb-6">
        <KeyboardBackspaceIcon />
      </div>
      
        <>
          <div key={productDetails.id} className={styles.image}>
            <CarouselImage image={productDetails.img} />
          </div>

          <div className={styles.info}>
            <strong className={styles.title}>{productDetails.product}</strong>
            <strong>Brand: {productDetails.brand}</strong>
            <h3>Quantity: {productDetails.quantity}</h3>
            <span className={styles.price}>
              <strong>&#x20A6;{productDetails.price.toFixed(2)}</strong>
            </span>

            <section className={styles.describe}>
              <h2>Description:</h2>
              <p>{productDetails.description}</p>
            </section>
            <section className={styles.share}>
              <h5>Share</h5>
              <span>
                <i className="fa-brands fa-facebook fa-xl"></i>
                <i className="fa-brands fa-instagram fa-xl"></i>
                <i className="fa-brands fa-square-whatsapp fa-xl"></i>
              </span>
            </section>
          </div>
        </>
    </div>
  );
}

export default ProductDetails
