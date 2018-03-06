/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu } from 'material-ui';
import LanguageIcon from 'material-ui-icons/Language';
import MenuItem from 'material-ui/Menu/MenuItem';
import { menuItemHeight, menuItemWidth } from '../../theme/dimensions';

const languages = [{
  language: 'pl',
  name: 'polski',
  flag: require('../../../images/pl-flag.svg')
}, {
  language: 'en',
  name: 'English',
  flag: require('../../../images/us-flag.svg')
}];

class LanguageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null
    };
  }

  onClick = (event) => {
    this.setState({ menuAnchor: event.currentTarget });
  };

  onSelectLanguage = (locale) => {
    this.props.setLocale(locale);
    this.onClose();
  };

  onClose = () => {
    this.setState({ menuAnchor: null });
  };

  render() {
    const { locale, classes } = this.props;
    const { menuAnchor } = this.state;
    const open = !!menuAnchor;

    return ([
      <IconButton
        key="button"
        aria-label="More"
        aria-owns={open ? 'long-menu' : null}
        aria-haspopup="true"
        onClick={this.onClick}
      >
        <LanguageIcon />
      </IconButton>,
      <Menu
        id="long-menu"
        key="menu"
        anchorEl={menuAnchor}
        open={open}
        onClose={this.onClose}
        PaperProps={{
          style: {
            maxHeight: menuItemHeight * 4.5,
            width: menuItemWidth
          }
        }}
      >
        {languages.map(option => (
          <MenuItem
            key={option.language}
            selected={option.language === locale}
            onClick={() => this.onSelectLanguage(option.language)}
          >
            <img className={classes.flag} src={option.flag} alt={option.name} />
            <span className={classes.text}>{option.name}</span>
          </MenuItem>
        ))}
      </Menu>
    ]);
  }
}

LanguageButton.propTypes = {
  locale: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    flag: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  setLocale: PropTypes.func.isRequired
};

export default LanguageButton;
