import { shopifyApiGraphQL } from '../config/shopify.js'
import {
  CREATE_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
  GET_CUSTOMER_BY_ID,
} from '../shopifyQueries.js'

const createCustomer = async (req, res) => {
  const { firstName, lastName, email, nickname } = req.body

  try {
    const variables = {
      input: {
        firstName,
        lastName,
        email,
        tags: ['42'],
        metafields: [
          {
            namespace: 'my_field',
            key: 'nickname',
            type: 'single_line_text_field',
            value: nickname,
          },
        ],
      },
    }

    const response = await shopifyApiGraphQL.post('', {
      query: CREATE_CUSTOMER_MUTATION,
      variables,
    })

    const { customerCreate } = response.data.data

    if (customerCreate.userErrors.length > 0) {
      console.error('User errors:', customerCreate.userErrors)
      return res.status(400).json({
        errors: customerCreate.userErrors.map((error) => error.message),
      })
    }

    res.status(201).json(customerCreate.customer)
  } catch (error) {
    console.error('Error creating customer:', error.message)
    res.status(500).json({ error: error.message })
  }
}

const getCustomers = async (req, res) => {
  const { input } = req.params

  try {
    const query = `query {
      customers(first: 10, query: "${input}") {
        edges {
          node {
            id
            firstName
            lastName
            email
          }
        }
      }
    }`

    const response = await shopifyApiGraphQL.post('', { query })

    res.json(response.data.data.customers.edges.map((edge) => edge.node))
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}

const getCustomerById = async (req, res) => {
  const decodedCustomerId = decodeURIComponent(req.params.id)

  const query = GET_CUSTOMER_BY_ID(decodedCustomerId)
  try {
    const response = await shopifyApiGraphQL.post('', {
      query: query,
    })

    res.json(response.data.data.customer)
  } catch (err) {
    console.log(err)
  }
}

const updateCustomer = async (req, res) => {
  const { id, firstName, lastName, email } = req.body

  const variables = {
    input: {
      id,
      firstName,
      lastName,
      email,
    },
  }

  try {
    const response = await shopifyApiGraphQL.post('', {
      query: UPDATE_CUSTOMER_MUTATION,
      variables,
    })
    res.json(response.data)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}

const customerController = {
  createCustomer,
  getCustomers,
  updateCustomer,
  getCustomerById,
}

export default customerController
