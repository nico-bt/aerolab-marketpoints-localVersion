import leftArrow from "@/public/assets/icons/arrow-left.svg"
import rightArrow from "@/public/assets/icons/arrow-right.svg"
import Image from "next/image"
import styles from "./styles.module.css"

function NextPreviousButtons({ currentPage, setCurrentPage, TOTAL_ITEMS, ITEMS_PER_PAGE }) {
  const handleScrollToElement = () => {
    const element = document.getElementById("productsContainer")
    element.scrollIntoView({ behavior: "smooth" })
  }

  const nextPage = () => {
    if (TOTAL_ITEMS > currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE) {
      setCurrentPage((prev) => prev + 1)
      handleScrollToElement()
    }
  }

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
      handleScrollToElement()
    }
  }

  return (
    <div className={styles.paginationButtons}>
      {currentPage > 0 && (
        <Image onClick={previousPage} src={leftArrow} width={46} height={46} alt="previous page" />
      )}

      {TOTAL_ITEMS > currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE && (
        <Image onClick={nextPage} src={rightArrow} width={46} height={46} alt="next page" />
      )}
    </div>
  )
}

export default NextPreviousButtons
