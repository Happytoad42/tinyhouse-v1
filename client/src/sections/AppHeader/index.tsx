import React from 'react';
import { Link } from 'react-router';
import { Layout } from 'antd';
import logo from './assets/tinyhouse-logo.png';

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header className='app-header'>
      <div className='app-header__logo-search-section'>
        <div className='app-header__logo'>
          <Link to='/'>
            <img src={logo} alt='TinyHouse logo' aria-label='logo' />
          </Link>
        </div>
      </div>
    </Header>
  );
};
