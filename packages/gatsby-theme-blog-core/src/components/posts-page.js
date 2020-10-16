import React from 'react';
import { object } from 'prop-types';

const PostsPage = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

PostsPage.propTypes = {
  data: object.isRequired,
};

export default PostsPage;
