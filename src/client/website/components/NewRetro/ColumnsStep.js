/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Select, TextField } from 'redux-form-material-ui';
import { CircularProgress, Divider, IconButton, List, Typography } from 'material-ui';
import { CardContent } from 'material-ui/Card';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import DeleteIcon from 'material-ui-icons/Delete';
import AddIcon from 'material-ui-icons/Add';
import ColumnIcon, { ColumnIcons } from '../Retro/ColumnIcon';
import { InputLabel } from '../../../../../node_modules/material-ui/Input/index';
import { FormControl } from '../../../../../node_modules/material-ui/Form/index';
import BaseStep from './BaseStep';
import { QUERY_STATUS_IN_PROGRESS, QUERY_STATUS_KEY } from '../../services/websocket/query';
import { newRetroShareRoutePath } from '../../routes/NewRetro/MainRoutes';

class ColumnsStep extends Component {
  componentWillMount() {
    const { joinRetro, retroShareId, retroShareParamId } = this.props;
    const { socket } = this.context;
    if (retroShareParamId !== retroShareId) {
      joinRetro(socket, retroShareParamId);
    }
  }

  addColumn = () => {
    const { addColumn, reset, newColumnName, newColumnIcon, canAddColumn } = this.props;
    if (!canAddColumn) return;
    addColumn(this.context.socket, newColumnName, newColumnIcon);
    reset();
  };

  shareRetro = () => {
    const { history, retroShareId } = this.props;
    history.push(newRetroShareRoutePath(retroShareId));
  };

  removeColumn = (column) => {
    const { socket } = this.context;
    const { removeColumn } = this.props;
    removeColumn(socket, column.id);
  };

  render() {
    const {
      columns, classes, joinRetroQuery, retroShareId, canAddColumn, retroShareParamId
    } = this.props;

    const hasMinColumns = columns.length >= 2;
    const notJoinedYet = retroShareId !== retroShareParamId
      || joinRetroQuery[QUERY_STATUS_KEY] === QUERY_STATUS_IN_PROGRESS;

    return (
      <BaseStep
        step={1}
        maxSteps={3}
        onNext={hasMinColumns ? this.shareRetro : undefined}
        {...this.props}
      >
        {notJoinedYet ? (
          <CardContent className={classes.cardContent}>
            <CircularProgress color="primary" />
          </CardContent>
        ) : (
          <CardContent className={classes.cardContent} key="content">
            <Typography align="left" type="headline" className={classes.headline}>
              <FormattedMessage id="columns.header" />
            </Typography>
            <Divider light />
            <div className={classes.newColumnContainer}>
              <FormControl className={classes.newColumnIconContainer}>
                <InputLabel htmlFor="icon-chooser">
                  <FormattedMessage id="columns.icon" />
                </InputLabel>
                <Field
                  name="newColumnIcon"
                  component={Select}
                  renderValue={type => (
                    <div className={classes.newColumnIconSelect}>
                      <ColumnIcon type={type} className={classes.horizontalMargins} />
                      <Typography type="button">
                        {type}
                      </Typography>
                    </div>
                  )}
                >
                  {ColumnIcons.map(type => (
                    <MenuItem key={type} value={type}>
                      <ColumnIcon type={type} className={classes.horizontalMargins} />
                      <Typography type="button">
                        {type}
                      </Typography>
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
              <Field
                name="newColumnName"
                component={TextField}
                className={`${classes.newColumnName} ${classes.horizontalMargins}`}
                autoFocus
                margin="dense"
                label={<FormattedMessage id="columns.column-name" />}
                type="i"
                fullWidth
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    this.addColumn();
                    ev.preventDefault();
                  }
                }}
              />
              <IconButton disabled={!canAddColumn} onClick={this.addColumn}>
                <AddIcon />
              </IconButton>
            </div>
            {columns.length > 0 ? (
              <List>
                {columns.map(column => [
                  <ListItem key={column.id} className={classes.listItem} button>
                    <ColumnIcon type={column.icon} className={classes.horizontalMargins} />
                    <ListItemText primary={column.name} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => this.removeColumn(column)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ])}
              </List>
            ) : (
              <Typography className={classes.addColumnsInfo}>
                <FormattedMessage id="columns.no-columns" />
              </Typography>
            )}
          </CardContent>
        )}
      </BaseStep>
    );
  }
}

ColumnsStep.defaultProps = {
  retroShareId: undefined
};

ColumnsStep.contextTypes = {
  socket: PropTypes.object.isRequired
};

ColumnsStep.propTypes = {
  // Route Params
  retroShareParamId: PropTypes.string.isRequired,
  // Variables
  canAddColumn: PropTypes.bool.isRequired,
  newColumnIcon: PropTypes.string.isRequired,
  newColumnName: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  retroShareId: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  })).isRequired,
  // Functions
  joinRetro: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  // Queries
  joinRetroQuery: PropTypes.object.isRequired,
  addColumnQuery: PropTypes.object.isRequired,
  removeColumnQuery: PropTypes.object.isRequired,
  // Styles
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    cardContent: PropTypes.string.isRequired,
    horizontalMargins: PropTypes.string.isRequired,
    newColumnIconSelect: PropTypes.string.isRequired,
    listItem: PropTypes.string.isRequired,
    addColumnsInfo: PropTypes.string
  }).isRequired
};
export default ColumnsStep;
