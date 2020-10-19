import React from 'react';
import { object } from 'prop-types';

const TagsPage = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

TagsPage.propTypes = {
  data: object.isRequired,
};

export default TagsPage;
