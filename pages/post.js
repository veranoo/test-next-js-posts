import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../store';

class Post extends Component {
  static async getInitialProps ({query: { id }, store}) {
    if (!id) {
      return;
    }
    await store.dispatch(fetchPost(id));
    return { id }
  }

  render() {
    return (
        <div>
          Post
          <br/>
          { JSON.stringify(this.props.post) }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    loading: state.loading
  }
};

export default connect(mapStateToProps, null)(Post);
