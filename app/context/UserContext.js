"use client"
import { useReducer, useContext, useEffect, createContext } from "react"
// import { BASE_URL, TOKEN } from "../apiData/apiData"

// Reducer
// ***********************************************************
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_LOAD":
      return {
        ...state,
        isFirstLoad: false,
      }

    case "REGISTER_USER_BEGIN":
      return {
        ...state,
        isLoading: true,
        error: false,
        isTransactionOk: false,
      }
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: false,
        user: action.payload.user,
        isFirstLoad: action.payload.isFirstLoad,
      }
    case "REGISTER_USER_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }

    case "REDEEM_ITEM_BEGIN":
      return {
        ...state,
        isLoading: true,
        isTransactionOk: false,
        error: false,
      }
    case "REDEEM_ITEM_CANCEL":
      return {
        ...state,
        isLoading: false,
        isTransactionOk: false,
        error: false,
      }
    case "REDEEM_ITEM_SUCCESS":
      const newState = {
        ...state,
        isLoading: false,
        isTransactionOk: true,
        error: false,
        user: {
          ...state.user,
          points: state.user.points - action.payload.product.cost,
          redeemHistory: [...state.user.redeemHistory, action.payload.product],
        },
      }
      localStorage.setItem("user", JSON.stringify(newState.user))
      return newState

    case "REDEEM_ITEM_ERROR":
      return {
        ...state,
        isLoading: false,
        isTransactionOk: false,
        error: action.payload.error,
      }

    case "ADD_POINTS_BEGIN":
      return {
        ...state,
        isLoading: true,
        chargingPointsSuccess: false,
      }
    case "ADD_POINTS_SUCCESS":
      const newStateAddedPoints = {
        chargingPointsSuccess: true,
        ...state,
        isLoading: false,
        chargingPointsSuccess: true,
        user: { ...state.user, points: state.user.points + action.payload.addedPoints },
      }
      localStorage.setItem("user", JSON.stringify(newStateAddedPoints.user))
      return newStateAddedPoints

    case "ADD_POINTS_ERROR":
      return {
        ...state,
        isLoading: false,
        chargingPointsSuccess: false,
        error: action.payload.error,
      }

    default:
      break
  }
}

// Initial State
// ***********************************************************
// LOCAL VERSION:
const INITIAL_USER = {
  name: "Yo",
  points: 2000,
  id: "noImportaElIdLocalVersion",
  createDate: new Date().toISOString(),
  redeemHistory: [],
}
// const userInLocal = localStorage.getItem("user")

const initialState = {
  isLoading: true,
  error: false,
  isTransactionOk: false,
  chargingPointsSuccess: false,
  user: INITIAL_USER,
  isFirstLoad: false, // En Local, espero a ver si hay en local storage. Y como inicialmente carga en server, hay que ver localStorage con useEffect
}

// Context
// ***********************************************************
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // GET User data
  //-------------------------------------------------------------------------
  const getUser = async () => {
    dispatch({ type: "REGISTER_USER_BEGIN" })

    const userInLocal = localStorage.getItem("user")
    if (userInLocal) {
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: { user: JSON.parse(userInLocal), isFirstLoad: false },
      })
    } else {
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: { user: INITIAL_USER, isFirstLoad: true },
      })
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // REDEEM ITEM
  //-------------------------------------------------------------------------
  const redeemItem = async (productId, product) => {
    dispatch({ type: "REDEEM_ITEM_BEGIN" })

    const productWithDate = { ...product, createDate: new Date().toISOString() }
    dispatch({ type: "REDEEM_ITEM_SUCCESS", payload: { product: productWithDate } })
  }

  const redeemItemCancel = () => {
    dispatch({ type: "REDEEM_ITEM_CANCEL" })
  }

  // ADD Points
  //-------------------------------------------------------------------------
  const POINTS_AMOUNT = 5000 //Validos: 1000, 5000 or 7500

  const addPoints = async () => {
    dispatch({ type: "ADD_POINTS_BEGIN" })
    // Para simular la call a la API y resetear el chargingPointsSuccess a false con el dispatch de arriba
    setTimeout(() => {
      dispatch({ type: "ADD_POINTS_SUCCESS", payload: { addedPoints: POINTS_AMOUNT } })
    }, 100)
  }

  // Set First Load
  //-------------------------------------------------------------------------
  const setFirstLoadFalse = () => {
    dispatch({ type: "SET_FIRST_LOAD" })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        redeemItemCancel,
        redeemItem,
        getUser,
        addPoints,
        setFirstLoadFalse,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use the context
const useUserContext = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserContext }
