"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import buyIconBlue from "@/public/assets/icons/buy-blue.svg"
import buyIconWhite from "@/public/assets/icons/buy-white.svg"
import coin from "@/public/assets/icons/coin.svg"
import { useUserContext } from "@/app/context/UserContext"
import ConfirmationDialog from "./ConfirmationDialog/ConfirmationDialog"
import styles from "./styles.module.css"
const {
  productItem,
  description,
  iconBuy,
  moreCoins,
  productItemOverlay,
  productItemOverlayNeedMoreCoins,
} = styles

function ProductItem({ item }) {
  const [enoughPoints, setEnoughPoints] = useState(false)
  const [showRedeem, setShowRedeem] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  // If !user --> Don't show redeem btn or coins needed, only the list of items
  const { user } = useUserContext()

  useEffect(() => {
    user?.points - item.cost >= 0 ? setEnoughPoints(true) : setEnoughPoints(false)
  }, [user])

  const handleClick = () => {
    setOpenDialog(true)
  }

  return (
    <>
      <div
        className={productItem}
        onMouseOver={() => setShowRedeem(true)}
        onMouseLeave={() => setShowRedeem(false)}
      >
        <img
          src={item.img.url}
          width={"100%"}
          alt={`${item.name} image`}
          style={{ opacity: user && !enoughPoints ? 0.4 : 1 }}
        />

        <div className={description}>
          <p>
            {item.category}
            <span>
              {item.cost}
              <Image src={coin} width={22} height={16} alt="coin img" />
            </span>
          </p>
          <h2>{item.name}</h2>

          {user && enoughPoints && !showRedeem && (
            <Image
              src={buyIconBlue}
              height={42}
              width={42}
              alt="Buy Icon"
              className={iconBuy}
              id="buy-blue-icon"
            />
          )}
        </div>

        {user && enoughPoints && (
          <div className={productItemOverlay}>
            <Image src={buyIconWhite} height={46} width={46} alt="Buy Icon" className={iconBuy} />
            <h2>
              {item.cost} <Image src={coin} width={39} height={39} alt="coin img" />
            </h2>
            <button onClick={handleClick}>Redeem now</button>
          </div>
        )}

        {user && !enoughPoints && (
          <>
            <div className={`${iconBuy} ${moreCoins}`}>
              You need {item.cost - user.points}
              <Image src={coin} width={22} height={16} alt="coin img" />
            </div>
            <div className={productItemOverlayNeedMoreCoins}></div>
          </>
        )}
      </div>

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} item={item} />
    </>
  )
}

export default ProductItem
