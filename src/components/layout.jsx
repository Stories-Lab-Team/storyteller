import Navbar from './Navbar'

export default function Layout({ children, index }) {
  return (
    <>
      <Navbar />
      <main key={index}>{children}</main>
    </>
  )
}
