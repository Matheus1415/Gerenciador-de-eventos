import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { ListDeEventosState } from "../atom";

const useDeletarEvento = () =>{
    const setListaEvento = useSetRecoilState<IEvento[]>(ListDeEventosState);

    return (evento : IEvento) => {
        setListaEvento(listaAntiga => [
            ...listaAntiga.filter(evt => evt.id !== evento.id)
        ])
    }
}

export default useDeletarEvento;