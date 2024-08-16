
function ProductDetails() {
  return (
    <div className={styles.content}>
      {productDetails?.map((item) => (
        <>
          <div key={item.id} className={styles.image}>
            <CarouselImage image={item.img} />
          </div>

          <div className={styles.info}>
            <strong className={styles.title}>{item.product}</strong>
            <strong>Brand: {item.brand}</strong>
            <h3>Quantity: {item.quantity}</h3>
            <span className={styles.price}>
              <strong>&#x20A6;{item.price.toFixed(2)}</strong>
            </span>
            
            <section className={styles.describe}>
              <h2>Description:</h2>
              <p>{item.description}</p>
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
      ))}
    </div>
  );
}

export default ProductDetails
