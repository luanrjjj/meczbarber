import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import { FiPower } from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Section,
  Container,
  Header,
  HeaderContent,
  Profile,
  ProvidersList,
} from './styles';

import logoImg from '../../assets/logo.svg';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
  email: string;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  dayFormatted: string;
  provider: Provider;
}

const DashboardUser: React.FC = () => {
  const history = useHistory();
  const { signOut, user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [providers, setProviders] = useState<Provider[]>([]);

  function handleClickAppointment() {
    history.push('/barbers');
  }

  useEffect(() => {
    api.get<Appointment[]>('/appointments/user').then(response => {
      const appointmentsFormatted = response.data.map(appointment => ({
        ...appointment,
        hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        dayFormatted: format(parseISO(appointment.date), 'dd/MM'),
      }));

      setAppointments(appointmentsFormatted);
    });
  }, [user.id]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name.split(' ').slice(0, -1).join(' ')}</strong>
              </Link>
            </div>
          </Profile>

          <button
            className="AppointmentButton"
            type="button"
            onClick={handleClickAppointment}
          >
            Marque um novo horário
          </button>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Section>
        <strong> Horários Agendados </strong>

        <ProvidersList>
          {appointments.length === 0 && (
            <p className="TextWithouAppointment">Nenhum Horário Agendado</p>
          )}
          {appointments.map(appointment => (
            <div className="Card" key={appointment.provider.id}>
              <img
                src={appointment.provider.avatar_url}
                alt={appointment.provider.name}
              />

              <div className="CardDetails">
                <div className="BarberNameFather">
                  <div className="BarberName">
                    <p>
                      {appointment.provider.name
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')}
                    </p>
                  </div>
                </div>
                <div className="WorkDetails">
                  <div className="DaysOfWork">
                    <AiOutlineCalendar />
                    <p> {appointment.dayFormatted}</p>
                  </div>
                  <div className="HoursOfWork">
                    <AiOutlineClockCircle />
                    <p> {appointment.hourFormatted} </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ProvidersList>
      </Section>
    </Container>
  );
};

export default DashboardUser;
