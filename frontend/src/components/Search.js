import { Autocomplete, Icon, TextContainer } from '@shopify/polaris'
import { SearchIcon } from '@shopify/polaris-icons'
import React, { useState, useCallback, useContext, useEffect } from 'react'
import { Context } from '../Context'
import axios from 'axios'

const Search = () => {
  const { setCustomers } = useContext(Context)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getSelection = async () => {
      if (inputValue === '') return

      setLoading(true)

      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/customers/${inputValue}`
        )

        const formattedCustomers = data.map((customer) => customer)
        setCustomers(formattedCustomers)
      } catch (err) {
        console.error('Error fetching options:', err)
      }

      setLoading(false)
    }

    getSelection()
  }, [inputValue])

  const updateText = useCallback(
    (value) => {
      setInputValue(value)

      if (!loading) {
        setLoading(true)
      }

      setTimeout(() => {
        if (value === '') {
          setLoading(false)
          return
        }
        setLoading(false)
      }, 300)
    },
    [loading]
  )

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value === selectedItem
        })
        return matchedOption && matchedOption.label
      })

      setSelectedOptions(selected)
      setInputValue(selectedValue[0] || '')
    },
    [options]
  )

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone='base' />}
      placeholder='Search'
      autoComplete='off'
    />
  )

  const emptyState = (
    <React.Fragment>
      <Icon source={SearchIcon} />
      <div style={{ textAlign: 'center' }}>
        <TextContainer>Could not find any results</TextContainer>
      </div>
    </React.Fragment>
  )

  return (
    <div style={{ height: '50px' }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        emptyState={emptyState}
        onSelect={updateSelection}
        textField={textField}
        loading={loading}
      />
    </div>
  )
}

export default Search
