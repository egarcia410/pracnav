import React, { FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';
import './Input.scss';

interface IInputProps {
  type?: string;
  placeholder?: string;
  classes?: { root: string; field: string; icon: string };
  isValid?: null | boolean;
  name?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<IInputProps> = ({ classes, isValid, ...rest }) => {
  let inputFieldClass = classNames(
    'input-field',
    classes && classes.field ? classes.field : '',
    {
      'is-valid': isValid === true,
      'is-invalid': isValid === false
    }
  );
  let inputIconClass = classNames(
    'input-icon',
    classes && classes.icon ? classes.icon : '',
    {
      'is-valid': isValid === true,
      'is-invalid': isValid === false
    }
  );
  return (
    <div className="input-root">
      <input className={inputFieldClass} {...rest} />
      {isValid !== null ? (
        <FontAwesomeIcon
          className={inputIconClass}
          icon={isValid ? faCheck : faTimes}
        />
      ) : null}
    </div>
  );
};

Input.defaultProps = {
  isValid: null,
  type: 'text'
};

export default Input;
