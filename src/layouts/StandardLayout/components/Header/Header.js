import { Avatar, Col } from 'antd';
import { withAppContext } from 'contexts/AppContext/AppContext';

import TextButton from 'components/TextButton/TextButton';

import { HeaderRow } from './Header.styles';

const Header = ({ onLogout, user }) => {
  return (
    <HeaderRow justify="space-between">
      <Col>
        <Avatar src={user.image} size="large" style={{ marginRight: 8, border: 1 }} />
        <span>{user.name}</span>
      </Col>
      <Col>
        <TextButton text="Logout" onClick={onLogout} />
      </Col>
    </HeaderRow>
  );
};

export default withAppContext(Header);
