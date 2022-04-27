import { createGlobalStyle } from "styled-components";
import MarkRegular from "../assets/fonts/MarkOT-Regular.woff2";
import MarkMedium from "../assets/fonts/MarkOT-Medium.woff2";
import MarkBold from "../assets/fonts/MarkOT-Bold.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: Mark;
      font-style: normal;
      font-weight: 400;
      src: url(${MarkRegular}) format("woff2")
  }

  @font-face {
      font-family: Mark;
      font-style: normal;
      font-weight: 500;
      src: url(${MarkMedium}) format("woff2")
  }
  @font-face {
      font-family: Mark;
      font-style: normal;
      font-weight: 700;
      src: url(${MarkBold}) format("woff2")
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  }

  * {
  box-sizing: border-box;
  outline: none;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
  display: block;
  }

  body {
  line-height: 1;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Mark', Helvetica, Tahoma, Verdana, sans-serif;
  line-height: 1.4;
  font-size: 16px;
  color: #333;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
  font-weight: 700;
  margin-bottom: 1rem;
  }

  h1 {
  font-size: 2rem;
  }

  h2 {
  font-size: 1.5rem;
  }
  h3 {
  font-size: 1.4rem;
  }
  h4 {
  font-size: 1.3rem;
  }
  h5 {
  font-size: 1.2rem;
  }
  h6 {
  font-size: 1.1rem;
  }

  button {
  border: 0;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  }

  strong {
  font-weight: 700;
  }

  p {
  margin: 0;
  }

  ol,
  ul {
  padding: 0;
  margin: 1rem 1rem 1rem 2rem;
  }

  ul {
  list-style: disc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  blockquote,
  q {
  quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
  content: '';
  content: none;
  }


  figure {
  margin: 0;
  padding: 0;
  }

  img {
  max-width: 100%;
  display: block;
  }

  a {
  text-decoration: none;
  }
`;
export default GlobalStyle;
