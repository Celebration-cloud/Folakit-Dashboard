/* eslint-disable react/prop-types */
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
function CustomerProfile({setOpen, details}) {
  return (
    <div
      style={window.location.pathname === "/log/settings" ? { width: "100%" } : {}}
      className={
        window.location.pathname === "/admin" ? "container" : undefined
      }
    >
      {window.location.pathname !== "/log/settings" && (
        <KeyboardBackspaceIcon onClick={() => setOpen(false)} />
      )}
      <div className="max-w-sm mx-auto bg-card text-card-foreground rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full"
            src={details && details}
            alt="User profile picture"
          />
          <h2 className="mt-4 text-lg font-semibold">
            {details && details?.name}
          </h2>
          <p className="text-muted-foreground">CEO, Brack Ltd.</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <div>
              <span>{details && details?.email}</span>
              {window.location.pathname !== "/log/settings" && (
                <span className="ml-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                  Email Verified
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>
            <span>{details && details?.phone}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">State/Region</span>
            <span>{details && details[0]?.address.city}</span>
          </div> */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address</span>
            <span>{details && details?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile
