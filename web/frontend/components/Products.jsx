import { useState } from "react";
import {
  Pagination,
  Frame,
  Spinner,
  Banner,
  Page,
  Layout,
  Toast,
} from "@shopify/polaris";
import Product from "./Product";
import noImage from "../assets/no-image.jpg";
import { useAuthenticatedFetch } from "../hooks";
import { useAppQuery } from "../hooks/useAppQuery";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);

  let i = 0;
  let title;
  let id;
  let featuredImage;
  let transformedSrc;
  let altText;
  let retval = [];
  let variants;
  let items;
  let cursor;
  let hasNext;
  let hasPrevious;
  let inventory;

  const {
      data,
      refetch,
      isLoading:dataIsLoading,
      error
    } = useAppQuery({
      url: "/api/products/fetch",
      reactQueryOptions: {
        onSuccess: () => {
          setIsLoading(false);
        },
        keepPreviousData:true,
      },
    });
  
    if (dataIsLoading) {
      return (
        <div>
          <Frame>
            <Spinner accessibilityLabel="Spinner" size="large" color="teal" />
          </Frame>
        </div>
      );
    }
    if (error) {
      return (
        <div>
          <Banner title={error.message} status="critical">
            <p>{error.stack}</p>
          </Banner>
        </div>
      );
    }

  items = data.products.edges;
  cursor = items[items.length - 1].cursor;
  hasNext = data.products.pageInfo.hasNextPage;
  hasPrevious = data.products.pageInfo.hasPreviousPage;

  for (i in items) {
    title = items[i].node.title;
    id = items[i].node.id.replace(/\D/g, "");
    inventory = items[i].node.totalInventory;
    featuredImage = items[i].node.featuredImage;
    variants = items[i].node.variants.edges;

    if (featuredImage == null) {
      transformedSrc = noImage;
      altText = `${title} has no image`;
    } else if (featuredImage != null) {
      transformedSrc = featuredImage.transformedSrc;
      altText = featuredImage.altText;
    }

    retval.push(
      Product(id, title, transformedSrc, altText, inventory, variants)
    );
  }

  function nextPage(cursor) {
    refetch({
      after: cursor,
    });
  }

  function previousPage(cursor) {
    refetch({
      before: cursor,
    });
  }
  return (
    <>
      {retval}
      <Pagination
        label="Pages"
        hasPrevious={hasPrevious}
        onPrevious={() => previousPage(cursor)}
        previousTooltip="Previous Page"
        nextTooltip="Next Page"
        hasNext={hasNext}
        onNext={() => nextPage(cursor)}
      />
    </>
  );
}
