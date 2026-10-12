import React, { ReactElement } from 'react';
import {
  Footer as ConstellationFooter,
  FooterItem,
  Link,
} from '@constellation/core';

export default function Footer(): ReactElement {
  return (
    <ConstellationFooter>
      <FooterItem>
        <Link href="https://www.lloydsbankinggroup.com" external>
          Security
        </Link>
      </FooterItem>
      <FooterItem>
        <Link href="https://www.lloydsbankinggroup.com" external>
          Cookies
        </Link>
      </FooterItem>
      <FooterItem>
        <Link href="https://www.lloydsbankinggroup.com" external>
          Privacy
        </Link>
      </FooterItem>
      <FooterItem>
        <Link href="https://www.lloydsbankinggroup.com" external>
          Rates & Charges
        </Link>
      </FooterItem>
    </ConstellationFooter>
  );
}





