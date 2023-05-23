import Header from "./components/Header/Header"
import { UserProvider } from "./context/UserContext"
import "./globals.css"
import { Source_Sans_Pro } from "next/font/google"

const sourceSans = Source_Sans_Pro({
  weight: ["400", "600"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Aerolab Market",
  description: "Aerolab challenge by Nico Battaglia",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={sourceSans.className}>
          <div className="container">
            <Header />
            <main>{children}</main>
          </div>
        </body>
      </UserProvider>
    </html>
  )
}
