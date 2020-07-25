import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  nav {
    background-color: #ccc;
  }

  .centered {
    margin: 10px 20px;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
  .react-bootstrap-table table {
    table-layout: auto !important;
  }
  li.item {
    margin: 10px;
  }
  .count {
    margin: 0 10px;
  }
`;

export default GlobalStyle;
