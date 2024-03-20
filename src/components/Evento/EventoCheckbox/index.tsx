import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import { useSetRecoilState } from 'recoil';
import { ListDeEventosState } from '../../../state/atom';

const EventoCheckbox: React.FC<{ evento: IEvento}> = ({ evento,  }) => {

  const setListaDeEventos = useSetRecoilState(ListDeEventosState);
  
  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ];

  const alterarStatus = () =>{

    const eventoAlterado = {...evento}


    eventoAlterado.completo = !eventoAlterado.completo;

    setListaDeEventos(listaAtiga => {
      const indice = listaAtiga.findIndex(evt => evt.id === evento.id);
      return[...listaAtiga.slice(0, indice), eventoAlterado, ...listaAtiga.slice(indice + 1)]
    });

  }


  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>)
}

export default EventoCheckbox