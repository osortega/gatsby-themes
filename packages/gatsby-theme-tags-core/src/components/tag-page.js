import React from 'react';
import { object } from 'prop-types';

const TagPage = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

TagPage.propTypes = {
  data: object.isRequired,
};

export default TagPage;
