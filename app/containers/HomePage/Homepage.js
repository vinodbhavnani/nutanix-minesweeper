/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
// import Header from '../../components/Header/Header.js';
// import Footer from '../../components/Footer/Footer.js';
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <div className="home-page">
          <section className="centered">Home page</section>
        </div>
      </article>
    );
  }
}
