import React from 'react';

import { FiPower } from 'react-icons/all';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Easy Kanban" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Link to="/NewProject">Project</Link>
      </Content>
    </Container>
  );
};

export default Dashboard;
