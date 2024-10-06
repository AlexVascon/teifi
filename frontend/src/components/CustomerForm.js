import {
  Form,
  FormLayout,
  TextField,
  Button,
  InlineError,
} from '@shopify/polaris'
import { useState, useEffect } from 'react'
import SuccessBanner from './SuccessBanner'
import axios from 'axios'

const CustomerForm = ({ customerId, width }) => {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const getCustomerById = async () => {
      const encodedCustomerId = encodeURIComponent(customerId)

      try {
        if (customerId) {
          const { data } = await axios.get(
            `http://localhost:4000/api/customers/id/${encodedCustomerId}`
          )

          setFirstName(data.firstName)
          setLastName(data.lastName)
          setEmail(data.email)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getCustomerById()
  }, [customerId])

  const handleSubmit = async () => {
    try {
      setIsSuccess(false)
      setError(null)
      const body = {
        firstName,
        lastName,
        email,
      }
      let response
      if (customerId) {
        await axios.put('http://localhost:4000/api/customers', body)
      } else {
        response = await axios.post('http://localhost:4000/api/customers', body)
      }

      setFirstName('')
      setLastName('')
      setEmail('')

      if (response.status === 201) {
        setIsSuccess(true)
      }
    } catch (err) {
      console.log(err)
      setError(err)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 'auto',
          width: 'auto',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: width,
          }}
        >
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label='First name'
                value={firstName}
                onChange={(val) => setFirstName(val)}
                autoComplete='off'
              />
              <TextField
                label='Last name'
                value={lastName}
                onChange={(val) => setLastName(val)}
                autoComplete='off'
              />
              <TextField
                type='email'
                label='Email address'
                value={email}
                onChange={(val) => setEmail(val)}
                autoComplete='email'
              />
              <Button
                submit
                disabled={!firstName | !lastName | !email}
                variant='primary'
                size='large'
              >
                Submit
              </Button>
            </FormLayout>
          </Form>
          {error && <InlineError message={error} fieldID='myFieldID' />}
          {isSuccess && <SuccessBanner />}
        </div>
      </div>
    </div>
  )
}

export default CustomerForm
