import styled from '@emotion/styled';

export const PaginaWrapper = styled.div`
  padding: 20px;
  text-align: center;
  background-color: white;
  margin-top: 80px; /* Ajusta según la altura de tu navbar */
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #000;
  }
`;

export const EventosLista = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const EventoCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 300px;
  text-align: left;
  h2 {
    font-size: 1.5em;
    color: #444;
  }
  p {
    margin: 10px 0;
    color: #666;
  }
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;