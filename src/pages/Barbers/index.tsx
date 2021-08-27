/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
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
  email: string;
}
const Barbers: React.FC = () => {
  const { user, signOut } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [newProviders, setNewProviders] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const barbers = [
    'amanda.vieira@poli.ufrj.br',
    'luanfreitas12@poli.ufrj.br',
    'luanfreitas12@hotmail.com',
    'antonio.vieira@poli.ufrj.br',
  ];
  const realProviders: Provider[] = [];

  useEffect(() => {
    providers.map(provider => {
      if (barbers.includes(provider.email)) {
        realProviders.push(providers[providers.indexOf(provider)]);
        setNewProviders(realProviders);
      }
      return newProviders;
    });
  }, [providers]);
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
                <strong>{user?.name.split(' ').slice(0, -1).join(' ')}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Section>
        <strong> Escolha seu Cabeleleiro</strong>
        <ProvidersList>
          {providers.length === 0 && !newProviders && (
            <p>Nenhum Cabeleleiros Disponível</p>
          )}
          {newProviders.map(provider => (
            <Link
              to={{
                pathname: `/appointment/${provider.name} `,
                state: { provider },
              }}
              key={provider.id}
              style={{ textDecoration: 'none' }}
            >
              <div className="Card" key={provider.id}>
                <img src={provider.avatar_url} alt={provider.name} />

                <div className="CardDetails">
                  <div className="BarberName">
                    <p>{provider.name.split(' ').slice(0, -1).join(' ')}</p>
                  </div>
                  <div className="WorkDetails">
                    <div className="DaysOfWork">
                      <AiOutlineCalendar />
                      <p> Segunda à Sexta</p>
                    </div>
                    <div className="HoursOfWork">
                      <AiOutlineCalendar />
                      <p> 08h às 18h</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </ProvidersList>
      </Section>
    </Container>
  );
};

export default Barbers;
