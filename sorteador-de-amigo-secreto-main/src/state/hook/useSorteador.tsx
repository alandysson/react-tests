import shuffle from "just-shuffle"
import { useSetRecoilState } from "recoil"
import { resultadoAmigoSecreto } from "../atom"
import { realizarSorteio } from "../helpers/RealizarSorteio"
import { useListaParticipantes } from "./useListaParticipantes"

export const useSorteador = () => {
   const participantes = useListaParticipantes()
   const setResultado = useSetRecoilState(resultadoAmigoSecreto)

   return () => {
      const resultado = realizarSorteio(participantes)
      setResultado(resultado)
   }
}