import React from 'react';
import { withAppContext } from 'contexts/AppContext/AppContext';

import Header from './components/Header/Header';

import { ContentLayout, ContentHeader, ContentBody } from './StandardLayout.styles';

const StandardLayout = ({ children }) => {
  return (
    <ContentLayout>
      <ContentHeader>
        <Header />
      </ContentHeader>
      <ContentBody>{children}</ContentBody>
    </ContentLayout>
  );
};

export default withAppContext(StandardLayout);
