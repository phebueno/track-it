import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu() {
  const location = useLocation();
  //Porcentagem editável progressbar
  const percentage = 66;

  if (location.pathname !== "/" && location.pathname !== "/cadastro") {
    return (
      <Footer>
        <LinkComum to="/habitos">Hábitos</LinkComum>
        <LinkHoje to="/hoje">
          <StyledProgressBar
            background={true}
            backgroundPadding={6}
            styles={buildStyles(stylesProgressBar)}
            value={percentage}
            text="Hoje"
          />
        </LinkHoje>
        <LinkComum to="/historico">Histórico</LinkComum>
      </Footer>
    );
  }
}

//Customização da progressbar
const stylesProgressBar = {
  backgroundColor: "#52B6FF",
  trailColor: "#52B6FF",
  pathColor: "#FFFFFF", //é possível customizar aqui o valor da porcentagem
  textColor: "#FFFFFF",
};

const Footer = styled.footer`
  height: 70px;
  width: inherit;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;
`;

const LinkComum = styled(Link)`
  text-decoration: none;
  font-size: 17.976px;
  line-height: 22px;
  color: #52b6ff;
`;

const LinkHoje = styled(Link)`
  width: 91px;
  height: 91px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  text-decoration: none;
  color: red;
`;

const StyledProgressBar = styled(CircularProgressbar)`
  width: 200px;
  color: red;
`;