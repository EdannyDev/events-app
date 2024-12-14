import styled from '@emotion/styled';

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 90px;
  padding-bottom: 90px;
`;

export const CalendarWrapper = styled.div`
  width: 80%; /* Reducir el ancho del calendario */
  max-width: 800px; /* Reducir el ancho máximo del calendario */
  margin: auto;
  padding: 10px; /* Reducir el padding para que el contenido se ajuste mejor */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const CalendarTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  color: black;
`;

export const EventDetail = styled.div`
  background-color: #1FD8BC;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;