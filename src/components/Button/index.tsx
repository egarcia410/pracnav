import React from 'react';
import classNames from 'classnames';
import './Button.scss';

interface IButtonProps {
  children?: React.ReactChild[] | string;
  className?: React.CSSProperties;
  variant?: string;
  fluid?: boolean;
  type?: any;
  onClick?: React.ReactEventHandler;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  variant,
  fluid,
  disabled,
  ...rest
}) => {
  let btnClass = classNames('btn', className, {
    'is-fluid': fluid === true,
    'is-plain': variant === 'plain',
    'is-disabled': disabled === true
  });

  return (
    <button className={btnClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
