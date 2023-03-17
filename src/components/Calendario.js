import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import BASE_URL from "../constants/urls";
import UserContext from "../contexts/UserContext";
import "./Calendario.css";
import dayjs from "dayjs";
import styled from "styled-components";

export default function Calendario() {
  const user = useContext(UserContext);
  const [infoCalendario, setInfoCalendario] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const url = `${BASE_URL}/habits/history/daily`;
    axios
      .get(url, config)
      .then((res) => {
        setInfoCalendario(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Algo deu errado!");
      });
  }, [user]);

  return (
    <div>
      <Calendar
        calendarType="US"
        tileContent={(day) => getDay(day, infoCalendario)}
        onClickDay={(day) => console.log(day)}
      />
    </div>
  );
}

function getDay(day, infoCalendario) {
  //INÍCIO USO DE DIAS
  require("dayjs/locale/pt-br"); //puxa o locale pt-br
  var localeData = require("dayjs/plugin/localeData");
  dayjs.extend(localeData); //libera o uso do plugin para usar meses e dias
  dayjs.locale("pt-br"); //seta o locale pt-br
  const weekdays = dayjs.weekdays();

  let now = dayjs();
  //variáveis fixas que só mudam se atualizar o site
  const diaDaSemana = weekdays[now.day()];
  const diaDaSemanaMaiusc =
    diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1);
  const diaMes = now.format("DD/MM");
  //FIM USO DE DIAS

  //Verifica se é ocorre nos dias já passados
  const diaPassado = dayjs(day.date).isBefore(now, "day");

  if (diaPassado) {
    //Verifica se aconteceu o dia
    const diaEncontrado = infoCalendario.find(
      (item) => item.day === dayjs(day.date).format("DD/MM/YYYY")
    );
    //Se encontrou o dia na lista, procura se há alguma tarefa incompleta nos hábitos
    if (diaEncontrado) {
      const tarefaIncompleta = diaEncontrado.habits.find(
        (item) => item.done === false
      );
      //Finalmente, exibe obj vermelho se a tarefa for incompleta. Verde se não houver tarefa incompleta
      if (tarefaIncompleta) {
        return <NotDia></NotDia>;
      }
      else{
        return <Dia></Dia>
      }
    }
  }
}

const NotDia = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  background-color: #ea5766;
  z-index: -1;
`;

const Dia = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  background-color: #8cc654;
  z-index: -1;
`;
