import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import coin from "@/public/assets/icons/coin.svg"
import closeIcon from "@/public/assets/icons/closeIcon.svg"
import Image from "next/image"
import { CircularProgress, DialogTitle, IconButton } from "@mui/material"
import { useUserContext } from "@/app/context/UserContext"

useUserContext
export default function ConfirmationDialog({ open, setOpen, item }) {
  const {
    getUser,
    redeemItem,
    redeemItemCancel,
    isLoading,
    error,
    isTransactionOk,
  } = useUserContext()

  const handleClose = () => {
    if (isTransactionOk) {
      getUser()
    } else {
      redeemItemCancel()
    }
    setOpen(false)
  }

  const handleGetItem = async () => {
    redeemItem(item._id)
  }

  const CloseBtn = () => {
    return (
      <DialogTitle sx={{ m: 0, p: 0 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Image src={closeIcon} width={32} height={32} alt="close icon" />
        </IconButton>
      </DialogTitle>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      {isTransactionOk && <CloseBtn />}

      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            margin: 0,
            background: error ? "red" : isTransactionOk ? "green" : "black",
            color: "white",
            width: "100%",
            padding: "20px 0",
            textAlign: "center",
          }}
        >
          {!error && !isTransactionOk && "Redeem Now!"}

          {error &&
            (error === "Internal Server Error"
              ? "Something went wrong. Try again later"
              : error)}

          {isTransactionOk && "Item redeemed!"}
        </h2>

        <img src={item.img.hdUrl} width={"100%"} alt={`${item.name} image`} />
        <h2 style={{ margin: 0, marginBottom: "8px", textAlign: "center" }}>
          {item.name}
        </h2>
        <div
          style={{
            display: "flex",
            fontSize: "2rem",
          }}
        >
          {item.cost}
          <Image src={coin} width={62} height={42} alt="coin img" />
        </div>

        {!isTransactionOk && !error && (
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              autoFocus
              onClick={handleGetItem}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress /> : "Get It!"}
            </Button>
          </div>
        )}
      </DialogActions>
    </Dialog>
  )
}
