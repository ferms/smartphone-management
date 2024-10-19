import React, { useEffect, useState, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/primereact.min.css';
import { fetchUser, User } from '../services/userService';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const op = useRef<OverlayPanel>(null);

  useEffect(() => {
    const getUser = async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
    };
    getUser();
  }, []);

  return (
    <header>
      {user && (
        <div className="header">
          <h3>
            Hola, {user.name.first} {user.name.last}
          </h3>
          <Avatar
            label={`${user.name.first[0]}${user.name.last[0]}`}
            size="large"
            shape="circle"
            style={{ cursor: 'pointer' }}
            onClick={(e) => op.current?.toggle(e)}
          />

          <OverlayPanel ref={op} showCloseIcon id="overlay_panel">
            <div>
              <p>
                <strong>Usuario:</strong> {user.login.username}
              </p>
              <p>
                <strong>Ciudad:</strong> {user.location.city}, <strong>País:</strong>{' '}
                {user.location.country}
              </p>
            </div>
          </OverlayPanel>
        </div>
      )}
    </header>
  );
};

export default Header;
