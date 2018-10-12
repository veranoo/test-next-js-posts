import React, { Component } from 'react';
import { getPosts, updateTitle } from '../store';
import { connect } from 'react-redux';
import PostItem from '../components/post-item';

class Index extends Component {
  static async getInitialProps({ store, isServer }) {
    await store.dispatch(getPosts());
    store.dispatch(updateTitle('Strona główna'));
    return { isServer }
  }

  render() {
    return (
        <div>
          {this.props.posts.map(item => <PostItem key={item.id} item={item}/>)}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
};

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)
