import styled from '@emotion/styled';



const Texto = styled.div `
    background-color: #B7322C;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform:uppercase;
    font-family: 'Lato', sans-serif;
    text-align: center;
    font-weight: 700;
`

const Error = ({children}) => {
  return (

        <Texto>
            {children}
        </Texto>

  )
};

export default Error;
