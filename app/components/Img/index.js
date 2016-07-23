/**
*
* Img
*
*/

import React from 'react';

function Img(props) {
  return (
    <img className={props.className} src={props.src} alt={props.alt} onClick={props.onClick} />
  );
}

Img.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};

export default Img;
