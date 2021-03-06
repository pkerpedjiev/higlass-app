import PropTypes from 'prop-types';
import React from 'react';

// Components
import ButtonIcon from './ButtonIcon';
import Icon from './Icon';

// Services
import pubSub from '../services/pub-sub';

// Styles
import './ErrorBar.scss';

class ErrorBar extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];
  }

  componentWillMount() {
    this.pubSubs.push(
      pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  render() {
    return (
      <header className='error-bar rel'>
        <div className={`flex-c flex-a-c flex-jc-sb ${this.props.wrap ? 'wrap' : ''}`}>
          <div className='flex-c flex-a-c error-bar-content'>
            <Icon iconId='warning' />
            <p className='error-bar-msg'>{this.props.msg}</p>
          </div>
          {this.props.isClosable &&
            <div className='flex-c flex-a-c flex-jc-c rel error-bar-close'>
              <ButtonIcon
                icon='cross'
                iconOnly={true}
                onClick={this.props.onClose} />
            </div>
          }
        </div>
      </header>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  keyUpHandler(event) {
    if (event.keyCode === 27) {  // ESC
      this.props.onClose();
    }
  }
}

ErrorBar.propTypes = {
  isClosable: PropTypes.bool,
  msg: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  wrap: PropTypes.bool,
};

export default ErrorBar;
