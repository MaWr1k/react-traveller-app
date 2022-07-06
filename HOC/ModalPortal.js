import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(children,document.getElementById("my-modal"))
    : null
}

export default ModalPortal