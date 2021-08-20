/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Section,
  ProvidersList,
} from './styles';

import logoImg from '../../assets/logo.svg';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
const Barbers: React.FC = () => {
  const { user, signOut } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);
  console.log(providers);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {user?.avatar_url && <img src={user.avatar_url} alt={user.name} />}
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user?.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Section>
        <strong>Cabeleleiros</strong>
        <ProvidersList>
          {providers.length === 0 && <p>Nenhum Cabeleleiros Disponível</p>}
          {providers.map(provider => (
            <>
              <Link
                to={{
                  pathname: `/appointment `,
                  state: { provider },
                }}
              >
                <div>
                  <img src={provider.avatar_url} alt={provider.name} />
                  <p>{provider.name}</p>
                </div>
              </Link>
            </>
          ))}
        </ProvidersList>
      </Section>
    </Container>
  );
};

export default Barbers;
