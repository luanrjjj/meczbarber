import styled from 'styled-components';
import { shade } from 'polished';

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    margin-right: 2%;
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    strong {
      color: #ff9000;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;
  margin-left: 15%;
  margin-right: 20px;
  max-width: 1120px;
  display: flex;
`;
export const Calendar = styled.div`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const SectionContent = styled.aside`
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-left: 15%;

  strong {
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 8px;
    margin-bottom: 8px;
    display: block;
    font-size: 20px;
  }
`;

export const Hours = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  color: white;
`;
export const Hour = styled(Button).attrs((props: HourProps) => ({
  enabled: props.available,
}))<HourProps>`
  padding: 10px;
  background: ${props => (props.selected ? '#FF9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`;
export const HourText = styled.span<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  background: '#FF9000';
  padding: 10px;
  border-radius: 5px;
  margin-right: 8px;
`;

export const ButtonSubmit = styled(Button)`
  background: #ff9000;
  border-radius: 10px;
  height: 50px;
  margin: 0 24px 24px;

  justify-content: center;
  align-items: center;
`;

export const ButtonSubmitText = styled(Button)`
  color: #312e38;
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  background: transparent;
  font-weight: bold;
`;
