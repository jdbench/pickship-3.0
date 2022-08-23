import React from 'react';
import { Card, TextContainer, Image, Stack } from '@shopify/polaris';

export default function Product(id, title, image, altText, inventory, variants) {
    let i = 0;
    let variantId;
    let variantQuantity;
    let variantTitle;
    let variantArray = [];
    
    for (i in variants){
        variantTitle = variants[i].node.title;
        variantId = variants[i].node.id.replace(/\D/g, '');
        variantQuantity = variants[i].node.inventoryQuantity;
        variantArray.push(
        <Stack key={variantId}
               distribution='fillEvenly'>
            <Stack.Item>
                <p>ID: {variantId}</p>
            </Stack.Item>
            <Stack.Item>
                <p>{variantTitle}</p>
            </Stack.Item>
            <Stack.Item>
                <p><b>IN STOCK : {variantQuantity}</b></p>
            </Stack.Item>
        </Stack>
        )
    }
    return(
        <Card title={title.toUpperCase()} key={id} sectioned>
            <Card.Section>
                <Stack vertical
                        alignment='center'
                        distribution='fillEvenly'>
                    <Stack.Item>
                        <Image source = {image} alt={altText} width={250}></Image>
                    </Stack.Item>
                    <Stack.Item>
                        <TextContainer>
                            <p>
                                ID: {id}
                            </p>
                        </TextContainer>
                    </Stack.Item>
                </Stack>
            </Card.Section>
            <Card.Section title='Inventory'>
                <Stack vertical
                       distribution='fillEvenly'>
                    <Stack.Item>
                        <p><b>TOTAL IN STOCK : {inventory}</b></p>
                    </Stack.Item>
                    {variantArray}
                </Stack>
            </Card.Section>
        </Card>
    );
}
