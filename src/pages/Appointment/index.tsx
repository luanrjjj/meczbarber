/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Section,
  Container,
  Header,
  HeaderContent,
  Profile,
  Calendar,
  SectionContent,
  Hours,
  Hour,
  HourText,
  ButtonSubmit,
  ButtonSubmitText,
} from './styles';
import 'react-day-picker/lib/style.css';
import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/toast';

export interface Provider {
  id: string;
  name?: string;
  avatar_url?: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}
interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Appointment: React.FC = () => {
  const { user, signOut } = useAuth();
  const { handle }: any = useParams();
  const location = useLocation();
  const { addToast } = useToast();

  const [provider1, setProvider] = useState<Provider[]>([]);

  const objectProvider: any = location.state;
  const selectedProvider: any = Object.values(objectProvider)[0];
  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }
    return today;
  }, []);

  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectedProvider.id,
        date,
      });

      addToast({
        type: 'success',
        title: 'Agendamento criado com suceso',
        description: 'Obrigado por ser nosso cliente',
      });
    } catch (err) {
      console.log(err);
      addToast({
        type: 'error',
        title: 'Erro ao criar agendamento',
        description:
          'Ocorreu um erro ao tentar criar o agendamento, tente novamente!',
      });
    }
  }, [selectedProvider, selectedDate, selectedHour]);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider.id}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);
        setSelectedHour(0);
      });
  }, [selectedProvider, selectedDate]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

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
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
        <SectionContent>
          <strong>Manhã</strong>
          <Hours>
            {morningAvailability.map(({ hourFormatted, hour, available }) => (
              <Hour
                available={available}
                selected={hour === selectedHour}
                key={hourFormatted}
                onClick={() => {
                  return setSelectedHour(hour);
                }}
              >
                <HourText selected={hour === selectedHour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </Hours>

          <strong>Tarde</strong>
          <Hours>
            {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
              <Hour
                available={available}
                selected={hour === selectedHour}
                key={hourFormatted}
                onClick={() => {
                  return setSelectedHour(hour);
                }}
              >
                <HourText selected={hour === selectedHour}>
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </Hours>
          <ButtonSubmit onClick={handleCreateAppointment}>
            <ButtonSubmitText>Agendar</ButtonSubmitText>
          </ButtonSubmit>
        </SectionContent>
      </Section>
    </Container>
  );
};

export default Appointment;
