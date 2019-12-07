import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import Helpers from '../Helpers';

import '../styles/HouseSlider.css';
import 'rc-slider/assets/index.css';

const { Handle } = Slider;

const getSeatDivision = (numDemSeats) => {
  const diff = (numDemSeats - 217.5) * 2;

  if (diff > 0) {
    return `D+${diff}`;
  }
  return `R+${Math.abs(diff)}`;
};

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={getSeatDivision(value)}
      visible
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const HouseSlider = ({ handleNumSeatsChange, numDemSeats }) => (
  <div>
    <Slider
      value={numDemSeats}
      step={1}
      max={435}
      min={0}
      onChange={value => handleNumSeatsChange(value)}
      handle={handle}
      handleStyle={numDemSeats >= 218 ? { borderColor: Helpers.getPartyColor('Democratic') } : { borderColor: Helpers.getPartyColor('Republican') }}
      trackStyle={{ background: Helpers.getPartyColor('Democratic') }}
      railStyle={{ background: Helpers.getPartyColor('Republican') }}
    />
  </div>
);

HouseSlider.propTypes = {
  handleNumSeatsChange: PropTypes.func.isRequired,
  numDemSeats: PropTypes.number.isRequired,
};

export default HouseSlider;
