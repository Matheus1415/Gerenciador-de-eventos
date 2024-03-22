import {useSetRecoilState} from 'recoil';
import { IEvento } from '../../interfaces/IEvento'; 
import { ListDeEventosState } from '../atom';

const useAtualizarEventos = () =>{
    const setListaDeEventos = useSetRecoilState<IEvento[]>(ListDeEventosState);

    return (evento: IEvento) => {
        return setListaDeEventos(listaAtiga => {
            const indice = listaAtiga.findIndex(evt => evt.id === evento.id);
            return[...listaAtiga.slice(0, indice), evento, ...listaAtiga.slice(indice + 1)]
          });
    }
}

export default useAtualizarEventos;