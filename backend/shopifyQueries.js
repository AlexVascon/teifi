export const CREATE_CUSTOMER_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        tags
        metafields(first: 3) {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
      userErrors {
        message
        field
      }
    }
  }
`

export const UPDATE_CUSTOMER_MUTATION = (input) => `
mutation updateCustomer($input: CustomerInput!) {
  customerUpdate(input: $input) {
    customer {
      id
      firstName
      lastName
      email
    }
    userErrors {
      message
      field
    }
  }
}`

export const GET_CUSTOMERS = () => `
  customers(first: 5, query: "${input}") {
    edges {
      node {
        id
        firstName
        lastName
        email
      }
    }
  }`

export const GET_CUSTOMER_BY_ID = (customerId) => `
  query {
    customer(id: "${customerId}") {
      firstName
      lastName
      email
    }
  }
`
