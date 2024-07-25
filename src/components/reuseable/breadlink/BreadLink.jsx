/* eslint-disable react/prop-types */
import Crumbs from '../breadcrumbs/Crumbs'

function BreadLink({name, status, children}) {
    const styles = {
      header: {
        backgroundColor: "#f0f0f0",
        padding: "30px 0px 30px 0px",
        fontSize: "24px",
        textAlign: "center",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      },
    };
  return (
    <div style={styles.header}>
      <h2>{name}</h2>
      <Crumbs status={status}>{children}</Crumbs>
    </div>
  );
}

export default BreadLink
