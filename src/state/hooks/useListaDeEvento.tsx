import { useRecoilValue } from "recoil";
import { ListDeEventosState } from "../atom";

const useListaDeEvento = () =>{
    return useRecoilValue(ListDeEventosState);
};

export default useListaDeEvento;