/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
function handleClick(event) {
  event.preventDefault();
}

export default function Crumbs({status, children}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          FolaKits
        </Link>
        {/* <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link> */}
        <Typography color="text.primary">{children}</Typography>
        {status && (
        <Typography color="text.primary">{status}</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
