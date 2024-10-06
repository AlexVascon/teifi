import React, { createContext, useState } from 'react'

export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null)
  const [customers, setCustomers] = useState()

  const openModal = (type) => setModalType(type)
  const closeModal = () => setModalType(null)

  return (
    <Context.Provider
      value={{ modalType, openModal, closeModal, customers, setCustomers }}
    >
      {children}
    </Context.Provider>
  )
}
