import React from "react";
import PropTypes from "prop-types";
import "./otp-input.css";

//const OtpInput = ({ value, valueLength, onChange })
const OtpInput = ({ valueLength }) => {
  return (
    <div className="otp-group">
      {[1, 2, 3, 4, 5, 6].map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
        />
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  value: PropTypes.string,
  valueLength: PropTypes.number,
  onChange: PropTypes.func,
};

export default OtpInput;
