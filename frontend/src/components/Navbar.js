import {
  Badge,
  ButtonGroup,
  FullscreenBar,
  Button,
  Text,
  Select,
} from '@shopify/polaris'
import { useState, useCallback } from 'react'

const Navbar = ({ scrollToSection, createRef, readRef, updateRef }) => {
  const [isFullscreen, setFullscreen] = useState(true)
  const [selected, setSelected] = useState('')

  const handleActionClick = useCallback(() => {
    setFullscreen(false)
  }, [])

  // Handle dropdown selection change
  const handleSelectChange = useCallback(
    (value) => {
      setSelected(value)
      if (value === 'create') {
        scrollToSection(createRef)
      } else if (value === 'read') {
        scrollToSection(readRef)
      } else if (value === 'update') {
        scrollToSection(updateRef)
      }
    },
    [createRef, readRef, updateRef, scrollToSection]
  )

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
          <Text variant='headingLg' as='p'>
            Teifi Customers
          </Text>
        </div>
      </div>
    </FullscreenBar>
  )

  return (
    <div style={{ height: '250px', width: '100%' }}>
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          {fullscreenBarMarkup}
        </div>
      )}
      <div style={{ padding: '1rem' }}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
