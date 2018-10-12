import React from 'react';

import * as PropTypes from 'prop-types';
import { Link } from '../routes';
import styled from 'styled-components';

const Comp = styled.div`
  background: #d7d7d7;
  padding: 10px;
  margin-bottom: 10px;
`;

const PostItem = (props) => {
  return (
      <React.Fragment>
        <Comp>
          <Link route='post' params={{ id: props.item.id }}>
            <a>
              <h2>{props.item.title}</h2>
            </a>
          </Link>
          <p>{props.item.body}</p>
        </Comp>
      </React.Fragment>
  );
};

PostItem.propTypes = { item: PropTypes.any };

export default PostItem;
