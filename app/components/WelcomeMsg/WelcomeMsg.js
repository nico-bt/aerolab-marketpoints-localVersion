"use client"

import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Logo from "../../../public/assets/aerolab-logo.svg"
import Image from "next/image"
import { useUserContext } from "@/app/context/UserContext"
import styles from "./styles.module.css"

const styleDialogText = { fontSize: "1.2rem", lineHeight: 1.6, marginTop: 2 }

export default function WelcomeMsg() {
  const { isFirstLoad, setFirstLoadFalse } = useUserContext()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isFirstLoad) {
      setOpen(true)
    }
  }, [isFirstLoad])

  const handleClose = () => {
    setFirstLoadFalse()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        bgcolor={"#1f1d1c"}
        color={"#ff7900"}
        style={{ fontSize: "1.6rem", letterSpacing: "3px", marginBottom: "0.5rem" }}
      >
        Welcome!
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={styleDialogText}>
          This is my version of the{" "}
          <a
            href="https://aerolab.us/coding-challenge-instructions"
            target="_blank"
            className={styles.link}
          >
            Aerolab Coding Challenge
          </a>{" "}
          to build a catalog view for a loyalty program app.
        </DialogContentText>

        <DialogContentText sx={styleDialogText}>
          You can click on the Aerolab Logo
          <Image width={50} height={30} src={Logo} alt="Logo image" />
          to charge 5000 points, but only, when you are less than 200 points in your account.
        </DialogContentText>

        <DialogContentText sx={styleDialogText}>
          Looking forward to hearing from you!
        </DialogContentText>
        <DialogContentText sx={styleDialogText}>
          <a href="https://nico-bt.github.io/portfolio/" target="_blank" className={styles.link}>
            Nico Battaglia
          </a>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
