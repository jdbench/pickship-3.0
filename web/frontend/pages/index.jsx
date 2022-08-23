import React from 'react';
import { Products, Locations, Picklists } from '../components';
import { Page, Layout, Stack } from '@shopify/polaris';

export default function Home() {
  return (
    <Page
    fullWidth
    title="Dashboard"
    >
      <Layout sectioned>
        <Stack>
          <Stack.Item>
            <Layout.Section oneThird>
              <Products />
            </Layout.Section>
          </Stack.Item>
          <Stack.Item>
            <Layout.Section oneThird>
              <Locations />
            </Layout.Section>
          </Stack.Item>
          <Stack.Item>
            <Layout.Section oneThird>
              <Picklists />
            </Layout.Section>
          </Stack.Item>
        </Stack>
      </Layout>
    </Page>
  )
}
