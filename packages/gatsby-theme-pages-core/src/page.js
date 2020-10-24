import React from 'react';
import { object } from 'prop-types';

const Page = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

Page.propTypes = {
  data: object.isRequired,
};

export default Page;
