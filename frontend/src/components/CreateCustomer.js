import React, { useContext, useState } from 'react'
import {
  FormLayout,
  TextField,
  Button,
  Form,
  InlineError,
} from '@shopify/polaris'
import DisplayCard from './DisplayCard'
import { Create, ModalSelected } from '../enums'
import Modal from './Modal'
import { Context } from '../Context'
import axios from 'axios'
import SuccessBanner from './SuccessBanner'

const CreateCustomer = () => {
  const { openModal, modalType, closeModal } = useContext(Context)
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState()

  const handleSubmit = async () => {
    try {
      setIsSuccess(false)
      setError(null)
      const body = {
        firstName,
        lastName,
        email,
      }
      const response = await axios.post(
        'http://localhost:4000/api/customers',
        body
      )

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
      <DisplayCard
        heading={Create.HEADING}
        action={Create.ACTION}
        image={Create.IMAGE}
        onAction={() => openModal(ModalSelected.CREATE)}
      />
      <Modal
        isOpen={modalType === ModalSelected.CREATE}
        closeModal={closeModal}
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
              width: '700px',
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
                ;
              </FormLayout>
            </Form>
            {error && <InlineError message={error} fieldID='myFieldID' />}
            {isSuccess && <SuccessBanner />}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateCustomer
