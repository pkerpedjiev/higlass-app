import PropTypes from 'prop-types';
import React from 'react';

// Services
import pubSub from '../services/pub-sub';

// Utils
import debounce from '../utils/debounce';

// Styles
import './SideBar.scss';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.checkStickAbilityDb = debounce(this.checkStickAbility.bind(this), 50);
    this.scrollHandlerDb = debounce(this.scrollHandler.bind(this), 50);

    this.sidebarOffsetTop = 0;
    this.state = {
      style: {
        marginTop: 0,
      },
    };
  }

  componentDidMount() {
    if (this.props.isSticky) {
      this.checkStickAbility();

      this.sidebarOffsetTop = this.sideBarEl.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;

      pubSub.subscribe('resize', this.checkStickAbilityDb);
      pubSub.subscribe('scrollTop', this.scrollHandlerDb);
    }
  }

  componentWillUnmount() {
    if (this.props.isSticky) {
      pubSub.unsubscribe('scrollTop', this.scrollHandlerDb);
    }
  }

  render() {
    return (
      <aside
        className='side-bar'
        ref={(el) => { this.sideBarEl = el; }}
        style={this.state.style}>
        {this.props.children}
      </aside>
    );
  }

  /* ---------------------------- Custom Methods ---------------------------- */

  checkStickAbility() {
    if (!this.sideBarEl) {
      this.stickinessDisabled = true;
      return;
    }

    // Header = 3rem; Margin = 1rem; 1rem = 16px
    const height = this.sideBarEl.getBoundingClientRect().height + (16 * 4);

    this.stickinessDisabled = window.innerHeight < height;
  }

  scrollHandler(scrollTop) {
    if (!this.stickinessDisabled) {
      this.setState({
        style: {
          marginTop: `${scrollTop}px`,
        },
      });
    } else if (
      this.state.style.marginTop !== 0 ||
      this.state.style.marginTop !== '0px'
    ) {
      this.setState({
        style: {
          marginTop: 0,
        },
      });
    }
  }
}

SideBar.defaultProps = {
  isSticky: false,
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
  isSticky: PropTypes.bool,
};

export default SideBar;
