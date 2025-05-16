import { css } from '@emotion/react'
import { colorPalette } from './colorPalette'

export default css`
  ${colorPalette}

  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 100 800;
    font-display: swap;
    src: url('../assets/fonts/PretendardVariable.woff2') format('woff2-variations');
  }

  :root {
    --header-zindex: 9;
    --dimmed-zindex: 10;
    --alert-zindex: 11;
    --modal-zindex: 12;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    max-width: 1280px;
    min-width: 768px;
    margin: 0 auto;
    text-align: center;
  }

  html {
    width: 100%;
    height: 100%;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      sans-serif;
  }

  body {
    height: 100%;
  }

  /* h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol {
    margin: 0;
    padding: 0;
  } */

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
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 100%;
  }
  /* HTML5 display-role reset for older browsers */
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
  ol,
  ul {
    list-style: none;
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
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    cursor: pointer;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /* input {
    all: unset;
    min-width: 0;
  } */
`
