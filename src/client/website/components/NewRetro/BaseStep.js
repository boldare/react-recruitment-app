import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'material-ui';
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import { FormattedMessage } from 'react-intl';

const BaseStep = ({
  classes, theme,
  step, maxSteps,
  children,
  onBack, onNext,
  backLabel, nextLabel
}) => (
  <div className={classes.root}>
    <Card className={classes.card}>
      {children}
      <MobileStepper
        key="stepper"
        type="dots"
        steps={maxSteps}
        position="static"
        activeStep={step}
        nextButton={
          <Button
            dense
            onClick={onNext}
            disabled={!onNext}
          >
            {nextLabel || <FormattedMessage id="navigation.next" />}
            {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
          </Button>
        }
        backButton={
          <Button
            dense
            onClick={onBack}
            disabled={!onBack}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            {backLabel || <FormattedMessage id="navigation.back" />}
          </Button>
        }
      />
    </Card>
  </div>
);

BaseStep.defaultProps = {
  onBack: undefined,
  onNext: undefined,
  backLabel: undefined,
  nextLabel: undefined
};

BaseStep.propTypes = {
  // Values
  step: PropTypes.number.isRequired,
  maxSteps: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  backLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  // Styles
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    cardContent: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object.isRequired
};

export default BaseStep;
