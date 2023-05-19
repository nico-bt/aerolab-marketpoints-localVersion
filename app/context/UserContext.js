"use client"
import { useReducer, useContext, useEffect, createContext } from "react"
import { BASE_URL, TOKEN } from "../apiData/apiData"

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
      return {
        ...state,
        isLoading: false,
        isTransactionOk: true,
        error: false,
      }
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
      return {
        ...state,
        isLoading: false,
        chargingPointsSuccess: true,
        user: { ...state.user, points: action.payload.resData["New Points"] },
      }
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
const initialState = {
  isLoading: true,
  error: false,
  isTransactionOk: false,
  chargingPointsSuccess: false,
  user: null,
  isFirstLoad: true,
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
    try {
      const res = await fetch(`${BASE_URL}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: "REGISTER_USER_SUCCESS", payload: { user: data } })
      } else {
        dispatch({
          type: "REGISTER_USER_ERROR",
          payload: { error: data.message },
        })
      }
    } catch (error) {
      dispatch({
        type: "REGISTER_USER_ERROR",
        payload: { error: error.message },
      })
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  // GET User History
  //-------------------------------------------------------------------------
  const getUserHistory = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      })
      const history = await res.json()
      console.log(history)
    } catch (error) {
      console.log(error)
    }
  }

  // REDEEM ITEM
  //-------------------------------------------------------------------------
  const redeemItem = async (productId) => {
    dispatch({ type: "REDEEM_ITEM_BEGIN" })
    try {
      const res = await fetch(`${BASE_URL}/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ productId }),
      })
      const resData = await res.json()
      if (res.ok) {
        dispatch({ type: "REDEEM_ITEM_SUCCESS" })
      } else {
        dispatch({
          type: "REDEEM_ITEM_ERROR",
          payload: { error: resData.error },
        })
      }
    } catch (error) {
      dispatch({
        type: "REDEEM_ITEM_ERROR",
        payload: { error: error.message },
      })
    }
  }

  const redeemItemCancel = () => {
    dispatch({ type: "REDEEM_ITEM_CANCEL" })
  }

  // ADD Points
  //-------------------------------------------------------------------------
  const POINTS_AMOUNT = 5000 //Validos: 1000, 5000 or 7500

  const addPoints = async () => {
    dispatch({ type: "ADD_POINTS_BEGIN" })
    try {
      const res = await fetch(`${BASE_URL}/user/points`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ amount: POINTS_AMOUNT }),
      })
      const resData = await res.json()
      console.log(resData)
      if (res.ok) {
        dispatch({ type: "ADD_POINTS_SUCCESS", payload: { resData } })
      } else {
        dispatch({
          type: "ADD_POINTS_ERROR",
          payload: { error: resData.error },
        })
      }
    } catch (error) {
      dispatch({
        type: "ADD_POINTS_ERROR",
        payload: { error: error.message },
      })
    }
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
        getUserHistory,
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
