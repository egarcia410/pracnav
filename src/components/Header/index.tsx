import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faCogs } from '@fortawesome/pro-regular-svg-icons';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <nav className="hdr">
      <div className="hdr-item left">
        <FontAwesomeIcon
          icon={faShip}
          style={{ height: '2rem', width: '2rem' }}
        />
      </div>
      <div className="hdr-item right">
        <FontAwesomeIcon
          icon={faCogs}
          style={{ height: '1.5rem', width: '1.5rem' }}
        />
      </div>
    </nav>
  );
};

export default Header;
