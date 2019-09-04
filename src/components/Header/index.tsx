import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faSignOut } from '@fortawesome/pro-regular-svg-icons';
import { MasterContext } from '../../context/MasterContext';
import './Header.scss';

const Header: React.FC = () => {
  const {
    UserContext: { signOut }
  } = useContext(MasterContext);

  return (
    <nav className="hdr">
      <div className="hdr-item left">
        <FontAwesomeIcon icon={faShip} className="hdr__icon-ship" />
      </div>
      <div onClick={() => signOut()} className="hdr-item right">
        <FontAwesomeIcon icon={faSignOut} className="hdr__icon-signout" />
      </div>
    </nav>
  );
};

export default Header;
