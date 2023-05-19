"use client"
import React from "react"
import coin from "../../../public/assets/icons/coin.svg"
import Image from "next/image"
import styles from "./styles.module.css"

function HistoryItem({ item }) {
  return (
    <div className={styles.historyItems}>
      <div className={styles.historyItemName}>
        <img src={item.img.url} alt={item.name} width={100} style={{ marginInline: "auto" }} />
        <p>{item.name}</p>
      </div>
      <p>
        {new Date(item.createDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p>
        {item.cost} <Image src={coin} width={22} height={14} alt="coin img" />
      </p>
    </div>
  )
}

export default HistoryItem
