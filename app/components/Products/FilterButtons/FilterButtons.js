"use client"
import { useMemo, useState } from "react"
import styles from "./filterButtons.module.css"
const { btnContainer, btnFilter, active } = styles

function FilterButtons({ setFilteredProducts, products }) {
  const [filterBy, setFilterBy] = useState("default") //default - highest - lowest

  let filteredLowest = useMemo(() => {
    return [...products].sort((a, b) => a.cost - b.cost)
  }, [products])

  let filteredHighest = useMemo(() => {
    return [...products].sort((a, b) => b.cost - a.cost)
  }, [products])

  return (
    <div className={btnContainer}>
      <span>Sort by: </span>
      <button
        className={filterBy === "highest" ? `${btnFilter} ${active}` : btnFilter}
        onClick={() => {
          setFilteredProducts(filteredHighest)
          setFilterBy("highest")
        }}
      >
        Highest Price
      </button>

      <button
        className={filterBy === "lowest" ? `${btnFilter} ${active}` : btnFilter}
        onClick={() => {
          setFilteredProducts(filteredLowest)
          setFilterBy("lowest")
        }}
      >
        Lowest Price
      </button>

      <button
        className={filterBy === "default" ? `${btnFilter} ${active}` : btnFilter}
        onClick={() => {
          setFilteredProducts(products)
          setFilterBy("default")
        }}
      >
        Recent
      </button>
    </div>
  )
}

export default FilterButtons
