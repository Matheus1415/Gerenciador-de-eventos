import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { ListDeEventosState } from "../atom";
import { obterId } from "../../utils";

const useAdicionarEvento = () => {
    const setListaDeEventos =  useSetRecoilState<IEvento[]>(ListDeEventosState);
    return (evento: IEvento) => {
        const hoje = new Date();
        if (evento.inicio < hoje){
            throw new Error("Evento não pode ser cadastrado com data menor que a atual");
        }   
        evento.id = obterId();
        return setListaDeEventos(listaAntiga => [...listaAntiga, evento]);
    }
}

export default useAdicionarEvento;
