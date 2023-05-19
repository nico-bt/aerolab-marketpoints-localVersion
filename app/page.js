import Hero from "./components/Hero/Hero"
import Products from "./components/Products/Products"
import WelcomeMsg from "./components/WelcomeMsg/WelcomeMsg"

export default function Home() {
  return (
    <>
      <WelcomeMsg />
      <Hero />
      <Products />
    </>
  )
}
