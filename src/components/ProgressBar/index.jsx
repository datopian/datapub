import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import "./ProgressBar.css";

const ProgressBar = (props) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const {
    size,
    progress,
    strokeWidth,
    circleOneStroke,
    circleTwoStroke,
    timeRemaining,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

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
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x={`${center}`} y={`${center + 2}`} className="svg-circle-text">
          {progress}%
        </text>
      </svg>
      {timeRemaining > 0 &&  <span className="time-remaining">{timeRemaining > 60 ? `${Math.floor(timeRemaining /60)} minute${Math.floor(timeRemaining /60) > 1 ? 's' : ''}` : `${Math.floor(timeRemaining)} second${timeRemaining > 1 ? 's' : ''}`} left</span>}
    </>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  circleOneStroke: PropTypes.string.isRequired,
  circleTwoStroke: PropTypes.string.isRequired,
};

export default ProgressBar;
