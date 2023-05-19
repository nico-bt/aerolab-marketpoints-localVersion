"use client"
import React, { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import styles from "./styles.module.css"
import { CircularProgress } from "@mui/material"
import { redirect } from "next/navigation"
import HistoryItem from "../components/HistoryItem/HistoryItem"

function History() {
  const { user, isLoading } = useUserContext()

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/")
    }
  }, [isLoading, user])

  const [history, setHistory] = useState([])
  const [historySlice, setHistorySlice] = useState([])
  const [indexSlice, setIndexSlice] = useState(0)
  const ITEMSxPAGE = 12

  // Infinite Scroll
  //------------------------------------------------------
  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight
    const currentHeight = Math.ceil(e.target.documentElement.scrollTop + window.innerHeight) // Distancia al top + Alto Ventana

    // Fin de pantalla
    if (currentHeight + 1 >= scrollHeight) {
      // console.log("Fin del scroll")

      if (history.length > indexSlice * ITEMSxPAGE + ITEMSxPAGE) {
        setHistorySlice((prevHistSlice) => {
          const newIndex = indexSlice + 1
          const newHistSlice = history.slice(
            newIndex * ITEMSxPAGE,
            newIndex * ITEMSxPAGE + ITEMSxPAGE
          )

          setIndexSlice((prev) => prev + 1)
          return [...prevHistSlice, ...newHistSlice]
        })
      }
    }
  }

  useEffect(() => {
    if (!user) return

    setHistory((prevHistory) => {
      // Para mostrar desde el item más reciente y crear slice
      const newHistory = [...user.redeemHistory].reverse()
      const newHistorySlice = newHistory.slice(0, ITEMSxPAGE)

      setHistorySlice(newHistorySlice)
      return newHistory
    })
  }, [user])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [historySlice])

  return (
    <>
      <div className={styles.historyTitle}>History</div>
      <div className={styles.historyContainer}>
        <div className={styles.historyColumnTitle}>
          <h2>Item</h2>
          <h2>Date</h2>
          <h2>Cost</h2>
        </div>

        {isLoading && (
          <div className={`${styles.historyItems} ${styles.noItems}`}>
            <CircularProgress />
          </div>
        )}

        {historySlice &&
          historySlice.length > 0 &&
          historySlice.map((item) => {
            return (
              <HistoryItem
                //For some reason the API does not retrieve unique _id for redeemHistory items
                // Obs: _id is different from productId
                key={item._id + item.createDate}
                item={item}
              />
            )
          })}

        {user && user.redeemHistory.length === 0 && (
          <div className={`${styles.historyItems} ${styles.noItems}`}>No items yet</div>
        )}
      </div>
    </>
  )
}

export default History
