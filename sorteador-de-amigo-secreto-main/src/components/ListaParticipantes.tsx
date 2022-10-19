import { useListaParticipantes } from "../state/hook/useListaParticipantes"

export const ListaParticipantes = () => {
   let participantes: string[] = useListaParticipantes()
   return (
      <ul>
         {participantes.map(participante =>
            <li key={participante}>{participante}</li>
         )}
      </ul>
   )
}