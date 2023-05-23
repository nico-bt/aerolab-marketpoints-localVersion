"use client"
import { useState, useEffect, useCallback } from "react"
import ProductItem from "./ProductItem"
import { CircularProgress } from "@mui/material"
import FilterButtons from "./FilterButtons/FilterButtons"
import styles from "./styles.module.css"
import fetchAllProducts from "./helper/fetchProductsFromAPI"
import CountTotalItems from "./CountTotalItems"
import NextPreviousButtons from "./NextPreviousButtons"
import { ProductsList } from "@/app/apiData/ProductsStaticList"

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [filteredProducts, setFilteredProducts] = useState([])

  // Fetch products
  //---------------------------------------------------------------------------
  // const getAllProducts = async () => {
  //   setIsLoading(true)
  //   const { data, error } = await fetchAllProducts()
  //   if (data) {
  //     setProducts(data)
  //     setFilteredProducts(data)
  //     setIsLoading(false)
  //   }
  //   if (error) {
  //     setError(error)
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getAllProducts()
  // }, [])

  // Para la versión local traigo los products de un array y cargo imgs local
  // para no pegarle a la API y web de Aerolab
  useEffect(() => {
    setProducts(ProductsList)
    setFilteredProducts(ProductsList)
    setIsLoading(false)
  }, [])

  //Pagination
  //---------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(0)

  const ITEMS_PER_PAGE = 16
  const TOTAL_ITEMS = filteredProducts.length

  const paginatedProducts = () => {
    return filteredProducts.slice(
      currentPage * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }

  // Go back to first page if filteredProdcuts change (sortBy: highest/lowest/default)
  useEffect(() => {
    setCurrentPage(0)
  }, [filteredProducts])

  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {error && <h1>{error.message}</h1>}

      {products?.length > 0 && (
        <div className={styles.productsContainer} id="productsContainer">
          <div className={styles.buttonsRowContainer}>
            <CountTotalItems
              TOTAL_ITEMS={TOTAL_ITEMS}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />

            <FilterButtons setFilteredProducts={setFilteredProducts} products={products} />

            <NextPreviousButtons
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              TOTAL_ITEMS={TOTAL_ITEMS}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </div>

          {paginatedProducts().length > 0 &&
            paginatedProducts().map((item) => <ProductItem item={item} key={item._id} />)}

          <div className={styles.buttonsRowContainerFooter}>
            <CountTotalItems
              TOTAL_ITEMS={TOTAL_ITEMS}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              currentPage={currentPage}
            />
            <NextPreviousButtons
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              TOTAL_ITEMS={TOTAL_ITEMS}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
            />
          </div>
        </div>
      )}
    </>
  )
}
