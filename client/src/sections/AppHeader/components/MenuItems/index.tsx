import { Avatar, Button, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import {
  displaySuccessNotification,
  displayErrorMessage,
} from '../../../../lib/utils';
import { Viewer } from '../../../../lib/types';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
      }
    },
    onError: (error) => {
      displayErrorMessage(`Log Out failed. Try again later.`);
    },
  });

  const handleLogOut = () => {
    logOut();
    displaySuccessNotification('Log Out successfully');
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key='/user'>
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key='/logout'>
          <div onClick={handleLogOut}>
            <LogoutOutlined />
            Log Out
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to='/login'>
          <Button type='primary'>Sign in</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode='horizontal' selectable={false} className='menu'>
      <Item key='/host'>
        <Link to='/host'>
          <HomeOutlined />
          Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
