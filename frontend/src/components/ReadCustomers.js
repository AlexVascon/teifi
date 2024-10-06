import React, { useContext, useState, useMemo, useEffect } from 'react'
import DisplayCard from './DisplayCard'
import { View, ModalSelected } from '../enums'
import { Context } from '../Context'
import Modal from './Modal'
import Search from './Search'
import CustomerForm from './CustomerForm'
import {
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  Layout,
  Card,
  BlockStack,
  Button,
} from '@shopify/polaris'
import axios from 'axios'

const ReadCustomers = () => {
  const { openModal, modalType, closeModal, customers, setCustomers } =
    useContext(Context)
  const [customer, setCustomer] = useState()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/customers/*'
        )
        setCustomers(data)
      } catch (err) {
        console.log(err)
      }
    }

    getCustomers()
  }, [])

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
        heading={View.HEADING}
        action={View.ACTION}
        image={View.IMAGE}
        onAction={() => openModal(ModalSelected.VIEW)}
      />
      <Modal isOpen={modalType === ModalSelected.VIEW} closeModal={closeModal}>
        <Layout>
          <Layout.Section variant='oneHalf'>
            <LegacyCard>
              {customers && (
                <ResourceList
                  resourceName={{ singular: 'customer', plural: 'customers' }}
                  items={customers}
                  renderItem={(customer) => {
                    const { id, firstName, lastName, email } = customer
                    const media = <Avatar customer size='md' name={firstName} />

                    return (
                      <ResourceItem
                        onClick={() => setCustomer(customer)}
                        id={id}
                        media={media}
                        accessibilityLabel={`View details for ${firstName} ${lastName}`}
                      >
                        <Text variant='bodyMd' fontWeight='bold' as='h3'>
                          {firstName + ' ' + lastName}
                        </Text>
                      </ResourceItem>
                    )
                  }}
                />
              )}
            </LegacyCard>
          </Layout.Section>
          <Layout.Section variant='oneHalf'>
            <Text as='h2' variant='headingSm'>
              Type * to retrieve all
            </Text>
            <Search />
            <Layout.Section variant='onethird'>
              <Card roundedAbove='sm'>
                <Text as='h2' variant='headingSm'>
                  Customer information
                </Text>
                {customer && (
                  <div>
                    {!isEdit ? (
                      <BlockStack gap='400'>
                        <div>
                          <BlockStack gap='200'>
                            <Text as='p' variant='bodyMd'>
                              {customer.id}
                            </Text>
                            <Text
                              as='h3'
                              variant='headingSm'
                              fontWeight='medium'
                            >
                              {customer.firstName + ' ' + customer.lastName}
                            </Text>
                            <div>
                              <Text as='p' variant='bodyMd'>
                                {customer.email}
                              </Text>
                            </div>
                          </BlockStack>
                        </div>
                        <Button
                          variant='primary'
                          onClick={() => setIsEdit(true)}
                        >
                          Edit
                        </Button>
                      </BlockStack>
                    ) : (
                      <CustomerForm customerId={customer.id} />
                    )}
                    {isEdit && (
                      <Button onClick={() => setIsEdit(false)}>Cancel</Button>
                    )}
                  </div>
                )}
              </Card>
            </Layout.Section>
          </Layout.Section>
        </Layout>
      </Modal>
    </div>
  )
}

export default ReadCustomers
