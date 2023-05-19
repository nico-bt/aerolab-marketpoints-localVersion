import { BASE_URL, TOKEN } from "@/app/apiData/apiData"

export default async function fetchAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const data = await res.json()
    return { data, error: false }
  } catch (error) {
    return { data: null, error }
  }
}
