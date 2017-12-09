import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Cell.css';

class Cell extends React.Component {
  static propTypes = {
    piece: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    piece: '-',
  };

  render() {
    const { piece } = this.props;
    return (
      <div onClick={this.props.onClick} className={s.root}>
        {piece}
      </div>
    );
  }
}

export default withStyles(s)(Cell);
