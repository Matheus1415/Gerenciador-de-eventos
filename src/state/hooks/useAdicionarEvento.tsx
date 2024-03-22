import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { ListDeEventosState } from "../atom";
import { obterId } from "../../utils";

const useAdicionarEvento = () => {
    const setListaDeEvento =  useSetRecoilState<IEvento[]>(ListDeEventosState);
    return (evento: IEvento) => {
        const hoje = new Date();
        if (evento.inicio < hoje){
            throw new Error("Evento não ppde ser cadastrado com data menor que a atual");
        }
        evento.id = obterId()
        return setListaDeEvento(listaAntiga => [...listaAntiga, evento]);
    }
}

export default useAdicionarEvento;