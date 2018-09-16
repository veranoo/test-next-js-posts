import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'

const Layout = ({ children, loading }) => {
  return (
      <div>
        <Link href={{ pathname: '/' }}>
          <a>Index</a>
        </Link>
        <Link href={{ pathname: '/about' }}>
          <a>About</a>
        </Link>
        {loading ? <div>Trwa ładowanie</div> : children}
      </div>
  )
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading
  }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
