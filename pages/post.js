import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, updateTitle } from '../store';
import PostItem from '../components/post-item';

class Post extends Component {
  static async getInitialProps ({query: { id }, store}) {
    if (!id) {
      return;
    }
    await store.dispatch(fetchPost(id));
    const { title } = store.getState().post;
    store.dispatch(updateTitle(`Post: ${title}`));
    return { id }
  }

  render() {
    return (
        <PostItem item={this.props.post}/>
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
