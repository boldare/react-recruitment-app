import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Typography, Toolbar, Tooltip } from 'material-ui';
import Chat from 'material-ui-icons/Chat';
import PersonIcon from 'material-ui-icons/Person';
import { HOMEPAGE_ROUTE_PATH } from '../../../routes/Homepage/MainRoutes';

const Header = ({
  classes,
  headline,
  retroId,
  openChangeNameDialog,
  children,
  leaveRetro,
  userName
}, { socket }) => (
  <header>
    <AppBar
      className={classes.appBar}
      position="static"
      color="default"
    >
      <Toolbar>
        <Link
          to={HOMEPAGE_ROUTE_PATH}
          onClick={() => leaveRetro(socket, retroId)}
        >
          <Chat className={classes.logoIcon} />
          <span className="logotype">RETROMEET</span>
        </Link>
        <Typography type="headline" className={classes.headline}>
          {headline}
        </Typography>
        <div className={classes.actionButtons}>
          {children}
          <IconButton onClick={openChangeNameDialog} className={classes.icon}>
            <PersonIcon />
            <Tooltip key={userName} title={userName} placement="bottom">
              <div className={classes.userName}>
                {userName.length > 18 ? `${userName.substring(0, 15)}...` : userName}
              </div>
            </Tooltip>
          </IconButton>

        </div>
      </Toolbar>
    </AppBar>
  </header>
);

Header.defaultProps = {
  headline: '',
  userName: '',
  retroId: null
};

Header.propTypes = {
  // Values
  userName: PropTypes.string,
  headline: PropTypes.string,
  retroId: PropTypes.string,
  children: PropTypes.node.isRequired,
  openChangeNameDialog: PropTypes.func.isRequired,
  leaveRetro: PropTypes.func.isRequired,
  // Styles
  classes: PropTypes.shape({
    appBar: PropTypes.string.isRequired,
    actionButtons: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    logoIcon: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

Header.contextTypes = {
  socket: PropTypes.object.isRequired
};

export default Header;
