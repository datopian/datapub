import React from "react";
import PropTypes from "prop-types";

import "./ProgressBar.css";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
    this.circleRef = React.createRef();
  }

  handleOffSet = (offset) => {
    this.setState({ offset });
  };

  componentDidMount() {
    const { size, strokeWidth } = this.props;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    this.setState({ center, radius, circumference });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      const progressOffset =
        ((100 - this.props.progress) / 100) * this.state.circumference;
      this.handleOffSet(progressOffset);

      this.circleRef.current.style =
        "transition: stroke-dashoffset 850ms ease-in-out";
    }
  }

  render() {
    const {
      size,
      progress,
      strokeWidth,
      circleOneStroke,
      circleTwoStroke,
      timeRemaining,
    } = this.props;

    const { center, circumference, radius } = this.state;

    return (
      <>
        <svg className="svg" width={size} height={size}>
          <circle
            className="svg-circle-bg"
            stroke={circleOneStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="svg-circle"
            ref={this.circleRef}
            stroke={circleTwoStroke}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={this.state.offset}
          />
          <text x={`${center}`} y={`${center + 2}`} className="svg-circle-text">
            {progress}%
          </text>
        </svg>
        {timeRemaining > 0 && (
          <span className="time-remaining">
            {timeRemaining > 60
              ? `${Math.floor(timeRemaining / 60)} minute${
                  Math.floor(timeRemaining / 60) > 1 ? "s" : ""
                }`
              : `${Math.floor(timeRemaining)} second${
                  timeRemaining > 1 ? "s" : ""
                }`}{" "}
            left
          </span>
        )}
      </>
    );
  }
}

ProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired,
};

export default ProgressBar;
