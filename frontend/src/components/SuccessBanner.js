import { Banner } from '@shopify/polaris'
import React from 'react'

const SuccessBanner = ({ children }) => {
  return (
    <Banner
      title={`Successfuly created new customer`}
      tone='success'
      onDismiss={() => {}}
    >
      {children}
    </Banner>
  )
}

export default SuccessBanner
