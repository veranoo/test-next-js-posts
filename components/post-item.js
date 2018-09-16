import React from 'react';

import * as PropTypes from 'prop-types';
import { Link } from '../routes';

const PostItem = (props) => {
  return (
      <React.Fragment key={props.item.id}>
        <Link route='post' params={{ id: props.item.id }}>
          <a>
            <h2>{props.item.title}</h2>
          </a>
        </Link>
        <p>{props.item.body}</p>
      </React.Fragment>
  );
};

PostItem.propTypes = { item: PropTypes.any };

export default PostItem;
