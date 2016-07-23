/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Img from 'components/Img';

import svgLogo from './radiorevolt.svg';

import styles from './styles.css';

const navbarLinks = [
  {
    path: '/programmer',
    title: 'Programmer',
  },
  {
    path: '/om',
    title: 'Om Oss',
  },
];

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    changeRoute: React.PropTypes.func,
  };

  render() {
    const navbarItems = navbarLinks.map(
      (link, index) =>
        <li key={`item-${index}`} className={styles.navbarItem} onClick={() => this.props.changeRoute(link.path)}>
          <span className={styles.navbarLink}>
            {link.title}
          </span>
        </li>
    );

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Img src={svgLogo} onClick={() => this.props.changeRoute('/')} alt="Logo" className={styles.logo} />
          <ul className={styles.navbar}>
            {navbarItems}
          </ul>
        </header>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(() => ({}), mapDispatchToProps)(App);
