import{ useState} from 'react';
import{FiSearch} from 'react-icons/fi';
//importado a biblioteca de icones
import './style.css';
import api from './services/api';





function App() {

  const[input, setInput ] = useState('');// 1° nome do estado(input), 2° funcao para trocar o valor do estado (setInput), quando chamar o input, seria para saber o valor deste estado, e quando chama a função setInput, seria para passar um novo valor digitado.

  const [cep, setCep] = useState({});//objeto vazio

   async function search(){ //funcao assincrona
    if(input === ''){
      alert("Preencha o campo com o CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      //console.log(response.data) verificar os dados
      setCep(response.data)
      setInput("")//limpar o campo

    }catch{ // caso o cep não existir
      alert("Ops erro ao buscar");
      setInput("") // voltar o campo para vazio
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      
      <div className="containerInput">
          
          <input type="text"
          placeholder="Digite seu cep..."
          value={input} // value(input) criado acima
          onChange={(event) => setInput(event.target.value)}
          />
          
          <button className="buttonSearch" onClick={search}>
            <FiSearch size={25} color='#fff'/> 
          </button>
      </div> 


    {Object.keys(cep).length > 0 && ( //acessando a useState cep e verificando se tem algum valor no objeto

        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>Rua: {cep.logradouro}</span>
        <span>Complemeto: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        </main>
    )}

    </div>
  );
}


export default App;
