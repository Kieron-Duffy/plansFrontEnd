import React, { ReactElement } from 'react';

import { FooterItem, Paragraph, Footer } from '@constellation/core';



export default function FooterComponent(): ReactElement {
  return (
    <Footer marginTop="03" >
      <FooterItem>
        <Paragraph marginBottom="06" marginTop="06">
          {}{' '}
        </Paragraph>
      </FooterItem>
    </Footer>
  );
}
