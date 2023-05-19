import styles from "./styles.module.css"

function CountTotalItems({ TOTAL_ITEMS, ITEMS_PER_PAGE, currentPage }) {
  return (
    <div className={styles.countOfTotal}>
      {(currentPage + 1) * ITEMS_PER_PAGE > TOTAL_ITEMS
        ? TOTAL_ITEMS
        : (currentPage + 1) * ITEMS_PER_PAGE}{" "}
      of {TOTAL_ITEMS} products
    </div>
  )
}

export default CountTotalItems
