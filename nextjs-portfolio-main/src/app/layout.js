import { store } from '@/lib/store'
import './globals.css'
import { Inter } from 'next/font/google'
import StoreProvider from './StoreProvider'
import InitAuth from '@/services/InitAuth'

const inter = Inter({ subsets: ['latin'],  })

export const metadata = {
  title: 'BlogPose - Home',
  description: 'BlogPose Create With app',
  alt : 'vishal'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <InitAuth />  {/* Set token from localStorage into Redux */}
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
