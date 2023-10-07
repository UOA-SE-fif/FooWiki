import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
      <body>
        <h1>Hello world!</h1>
        <a href="/register">register</a>
        <a href="/login">login</a>
      </body>
  )
}
