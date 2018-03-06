import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Stepper,
  Step,
  StepButton
} from 'material-ui';
import { FormattedMessage } from 'react-intl';

export const steps = [
  { key: 'write' },
  { key: 'vote' },
  { key: 'take-actions' },
  { key: 'closed' }
];

class Steps extends Component {
  handleStep = key => () => {
    const { socket } = this.context;
    const { changeStep } = this.props;
    changeStep(socket, key);
  }

  isDisabled = () => {
    const { userId, scrumMasterId } = this.props;
    return userId !== scrumMasterId;
  }

  render() {
    const { classes, step } = this.props;
    return (
      <Card className={classes.scrumMasterPanel}>
        <Stepper activeStep={steps.findIndex(s => s.key === step)} alternativeLabel nonLinear>
          {steps.map(({ key }) => (
            <Step key={key} className={classes.step}>
              <StepButton
                onClick={this.handleStep(key)}
                className={classes.stepButton}
                disabled={this.isDisabled()}
              >
                <span className="retro-step-label" >
                  <FormattedMessage id={`retro-steps.${key}`} />
                </span>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Card>
    );
  }
}

Steps.contextTypes = {
  socket: PropTypes.object.isRequired
};

Steps.propTypes = {
  userId: PropTypes.string.isRequired,
  scrumMasterId: PropTypes.string.isRequired,
  step: PropTypes.string.isRequired,
  changeStep: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    stepButton: PropTypes.string.isRequired,
    scrumMasterPanel: PropTypes.string.isRequired
  }).isRequired
};

export default Steps;
