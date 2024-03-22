import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import { useSetRecoilState } from 'recoil';
import { ListDeEventosState } from '../../../state/atom';
import useAtualizarEventos from '../../../state/hooks/useAtualizarEvento';

const EventoCheckbox: React.FC<{ evento: IEvento}> = ({ evento,  }) => {

  const setListaDeEventos = useSetRecoilState(ListDeEventosState);
  const atualizarEvento = useAtualizarEventos();

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ];

  const alterarStatus = () =>{

    const eventoAlterado = {...evento}


    eventoAlterado.completo = !eventoAlterado.completo;

    atualizarEvento(eventoAlterado);

  }


  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>)
}

export default EventoCheckbox