import { Shopify } from "@shopify/shopify-api";

export const DEFAULT_PRODUCTS_COUNT = 5;
const GET_PRODUCTS_QUERY = `
query ProductsQuery(
  $after: String
  $before: String
  $query: String
) {
  products(first: 10, after: $after, before: $before, query: $query) {
    edges {
      cursor
      node {
        variants(first: 15) {
          edges {
            node {
              displayName
              id
              sku
              barcode
              image {
                transformedSrc
              }
              inventoryQuantity
              title
            }
          }
        }
        title
        id
        description
        featuredImage {
          altText
          transformedSrc
        }
        totalInventory
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`

export default async function productGetter(session) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const products = await client.query({
    data: GET_PRODUCTS_QUERY,
    });

    return products;

  } catch (error) {
    if (error) {
      throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
    } else {
      throw error;
    }
  }
}