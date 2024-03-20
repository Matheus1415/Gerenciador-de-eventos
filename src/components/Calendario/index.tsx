
import React from 'react'
import { IEvento } from '../../interfaces/IEvento';
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import { ListDeEventosState } from '../../state/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario= () => {

  const eventosKalend = new Map<string, IKalendEvento[]>();
  const eventos= useRecoilValue(ListDeEventosState); 


  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })

  const setListaDeEventos = useSetRecoilState(ListDeEventosState);

  const onEventoDragFinish: OnEventDragFinish = (
    kalendEventoInalterado: CalendarEvent,
    kalendEventoAtualisado: CalendarEvent
  ) =>{
    const evento = eventos.find(evento => evento.descricao === kalendEventoAtualisado.summary);
    if(evento){
      const eventoAtualizado = {...evento};
      eventoAtualizado.inicio = new Date(kalendEventoAtualisado.startAt);
      eventoAtualizado.inicio = new Date(kalendEventoAtualisado.endAt);

      setListaDeEventos(listaAtiga => {
        const indice = listaAtiga.findIndex(evt => evt.id === evento.id);
        return[...listaAtiga.slice(0, indice), eventoAtualizado, ...listaAtiga.slice(indice + 1)]
      });
    }
  };



  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventoDragFinish}
      />
    </div>
  );
}

export default Calendario