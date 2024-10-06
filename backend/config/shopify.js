import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

const shopifyApiRest = axios.create({
  baseURL: `https://${SHOPIFY_DOMAIN}/admin/api/2024-07/`,
  headers: {
    'X-Shopify-Access-Token': ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
})

const shopifyApiGraphQL = axios.create({
  baseURL: `https://${SHOPIFY_DOMAIN}/admin/api/2024-07/graphql.json`,
  headers: {
    'X-Shopify-Access-Token': ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
})

export { shopifyApiRest, shopifyApiGraphQL }
