"use client"

import Image from "next/image"
import Logo from "../../../public/assets/aerolab-logo.svg"
import coin from "../../../public/assets/icons/coin.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserContext } from "@/app/context/UserContext"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import SuccessMessageChargingPoints from "./SuccessMessageChargingPoints/SuccessMessageChargingPoints"
import { Tooltip } from "@mui/material"

function Header() {
  const { user, isLoading, error, addPoints, chargingPointsSuccess } = useUserContext()
  const [openSuccesMsg, setOpenSuccesMsg] = useState(false)

  const actualPath = usePathname()

  const POINTS_FROM_WICH_CAN_RECHARGE = 200

  const handleAddPoints = async () => {
    if (user?.points <= POINTS_FROM_WICH_CAN_RECHARGE && !isLoading) {
      addPoints()
    }
  }

  useEffect(() => {
    if (chargingPointsSuccess) {
      setOpenSuccesMsg(true)
    }
  }, [chargingPointsSuccess])

  return (
    <div className={styles.navUser}>
      <Tooltip
        title={user?.points <= POINTS_FROM_WICH_CAN_RECHARGE ? "Add 5000 Points!" : ""}
        placement="right-end"
      >
        <Image
          width={39}
          height={36}
          src={Logo}
          alt="Logo image"
          onClick={() => handleAddPoints()}
          style={user?.points <= POINTS_FROM_WICH_CAN_RECHARGE ? { cursor: "pointer" } : ""}
        />
      </Tooltip>

      <SuccessMessageChargingPoints open={openSuccesMsg} setOpen={setOpenSuccesMsg} />

      {!isLoading && user && (
        <>
          <ul>
            <li className={actualPath === "/" ? styles.navLink : ""}>
              <Link href="/">Home</Link>
            </li>
            <li className={actualPath === "/history" ? styles.navLink : ""}>
              <Link href="/history">History</Link>
            </li>
          </ul>

          <ul>
            <li>{user?.name}</li>
            <li className={styles.navUserCoins}>
              {user?.points.toLocaleString()}{" "}
              <Image src={coin} width={24} height={24} alt="coin img" />
            </li>
          </ul>
        </>
      )}

      {/* For this challenge there is no auth implemented. Token was given. */}
      {/* But here you could display an error message if auth failed */}
      {/* You could enter a bad token to try */}
      {error && (
        <ul>
          <li>{error}</li>
        </ul>
      )}
    </div>
  )
}

export default Header
