import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToSocket } from './websocket';
import { retroJoin } from '../../actions/retro';
import { USER_CONNECT_QUERY_KEY, USER_TOKEN_KEY } from '../../reducers/user';
import { RETRO_SHARE_ID_KEY } from '../../reducers/retro';
import { QUERY_STATUS_KEY } from './query';

class Provider extends Component {
  constructor(props, context) {
    super(props, context);
    const { connectToSocket: createConnection, userToken, socketActions, dispatch } = this.props;
    this.socket = createConnection(userToken);
    Object.entries(socketActions).forEach(([name, actionType]) => {
      if (Array.isArray(actionType)) {
        const [success, failure] = actionType;
        this.socket.on(`${name}/success`, payload => dispatch({ type: success, payload }));
        this.socket.on(`${name}/failure`, payload => dispatch({ type: failure, payload }));
      } else {
        this.socket.on(`${name}`, payload => dispatch({ type: actionType, payload }));
      }
    });
  }

  getChildContext() {
    return { socket: this.socket };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.defaultProps = {
  userToken: undefined
};

Provider.propTypes = {
  connectToSocket: PropTypes.func.isRequired,
  userToken: PropTypes.string,
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  socketActions: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

Provider.childContextTypes = {
  socket: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  connectToSocket: userToken => dispatch(connectToSocket(userToken)),
  joinRetro: (socket, retroShareId) => dispatch(retroJoin(socket, retroShareId)),
  dispatch
});

const mapStateToProps = state => ({
  userToken: state.user[USER_TOKEN_KEY],
  connectionStatus: state.user[USER_CONNECT_QUERY_KEY][QUERY_STATUS_KEY],
  retroShareId: state.retro[RETRO_SHARE_ID_KEY]
});

const ProviderContainer = connect(mapStateToProps, mapDispatchToProps)(Provider);

export default ProviderContainer;
