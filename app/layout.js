import { Inter } from 'next/font/google'
import NavbarDefault from './components/nav'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="shadow-md bg-gradient-to-tr text-white mx-auto from-blue-gray-900 to-blue-gray-800">
          <NavbarDefault />
        </header>
        <main className="flex min-h-screen flex-col py-24 px-4 w-3/4 max-w-screen-md m-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
