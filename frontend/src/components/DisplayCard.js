import { LegacyCard, EmptyState } from '@shopify/polaris'
import React from 'react'

const DisplayCard = ({ heading, action, image, description, onAction }) => {
  return (
    <div style={{ width: '50%' }}>
      <LegacyCard sectioned>
        <EmptyState
          heading={heading}
          action={{ content: action, onAction }}
          image={image}
          fullWidth
        >
          <p>{description}</p>
        </EmptyState>
      </LegacyCard>
    </div>
  )
}

export default DisplayCard
