"use client"

import { Alert, Snackbar } from "@mui/material"

function SuccessMessageChargingPoints({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message="Note archived"
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Charged Points!
      </Alert>
    </Snackbar>
  )
}

export default SuccessMessageChargingPoints
