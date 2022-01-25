import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import {monedas} from '../data/monedas'

const InputSubmit = styled.input`
    margin-top: 30px;
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius:5px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos,setCriptos] = useState([]);

    const [error,setError] = useState(false);


    const [moneda ,SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptoMonedas ,SelectCriptomonedas] = useSelectMonedas('Elige tu Cripto Moneda', criptos);


    useEffect(() => {
        const consultarAPI = async() => {

            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const respuesta = await fetch(url);

            const resultado = await respuesta.json()


            const arrayCripto = resultado.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

              return objeto;

            } )

            setCriptos(arrayCripto);
        }

        consultarAPI();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

          if([moneda, criptoMonedas].includes('')) {

                setError(true);
              return;
          }

          setError(false);

          setMonedas({
              moneda,
              criptoMonedas
          })
    }

  return ( 

   <> {error && <Error>Todos los campos son obligatorios</Error>}

  
  <div>


    <form action="" onSubmit={handleSubmit}>
        <SelectMonedas
        />

        <SelectCriptomonedas />

        <InputSubmit type="submit"
         value="Cotizar" />
    </form>

  </div>

  </>
)
}

export default Formulario;
