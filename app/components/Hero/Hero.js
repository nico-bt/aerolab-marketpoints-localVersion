import Image from "next/image"
import headerImg from "../../../public/assets/header.png"
import styles from "./styles.module.css"

function Hero() {
  // Image and title are hardcoded for this challenge, but could be displayed dinamically in case of different categories
  return (
    <div className={styles.hero}>
      <Image
        src={headerImg}
        className={styles.heroImg}
        alt="Picture of headphones"
      />
      <div className={styles.heroText}>Electronics</div>
    </div>
  )
}

export default Hero
