import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
  width: 100%;
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
  margin-left: 10%;
  margin-right: 10%;
  max-width: 80%;
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    margin-left: 20px;
  }
`;
export const ProvidersList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
  list-style-type: none;
  max-width: 1100px;
  margin-left: 5%;
  margin-right: 7%;

  .Card {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    margin-left: 24px;
    transition: filter 0.2s;
    cursor: pointer;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #ff9000;
    }
    p {
      margin-left: 30px;
      color: #f4ede8;
      font-size: 16px;
      font-weight: 400;
      height: 30px;
      position: relative;
      padding-right: 10px;
      padding-left: 10px;
    }
    &:hover {
      top: -2px;
      z-index: 999;
      filter: brightness(0.9);
    }
  }

  .CardDetails {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 5%;

    .WorkDetails {
      flex-direction: column;
      display: block;
      margin-left: 10%;

      margin-right: 20%;

      .DaysOfWork {
        svg {
          position: absolute;
          margin-top: 1px;
          margin-left: 5px;
          color: #ff9000;
        }
        p {
          padding-left: 10px;
          width: 150px;
        }
      }

      .HoursOfWork {
        svg {
          position: absolute;
          margin-top: 1px;
          margin-left: 5px;
          color: #ff9000;
        }
        p {
          padding: 0 10px;
        }
      }
    }
  }
`;
