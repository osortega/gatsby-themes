import React from 'react';
import { object } from 'prop-types';

const PostPage = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

PostPage.propTypes = {
  data: object.isRequired,
};

export default PostPage;
