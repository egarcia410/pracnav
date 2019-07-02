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
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  variant,
  fluid,
  ...rest
}) => {
  let btnClass = classNames('btn', className, {
    'is-fluid': fluid === true,
    'is-plain': variant === 'plain'
  });

  return (
    <button className={btnClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
