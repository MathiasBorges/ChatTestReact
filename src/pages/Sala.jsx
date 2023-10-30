import React, {useState,useEffect,useRef} from "react"
import {databases,PROJECT_ID,DATABASE_ID,COLLECTION_ID_MESSAGES} from '../WriteConfig'
import { ID, Query } from "appwrite"
import "../sala.css"

const Sala = () =>{

    const[messages,getMessages]= useState([]);
    const[messagemCorpo,setMensagem]=useState("");
    
    useEffect ( 
        ()=>{
            pegaMensagens();

        },[]
    )
    
    const quandoEnviar = async (event)=>{
        event.preventDefault();
        let payload={body:messagemCorpo}

        try {
            let resposta = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload);
            console.log('Documento criado:', resposta);
            getMessages(prevState=>[...messages,resposta])
            setMensagem('')
        } catch (error) {
            console.error('Erro ao criar documento:', error);
        }
    }

    const pegaMensagens = async ()=>{
        const resposta = await databases.listDocuments(DATABASE_ID,COLLECTION_ID_MESSAGES,[Query.orderDesc('$createdAt')]);
        console.log('Resposta BD:', resposta);
        getMessages(resposta.documents)
    }  

    return(

            <div className="salaBox">
                <form onSubmit={quandoEnviar} id="messagem-form">
                    <textarea required placeholder="Digite alguma coisa" value={messagemCorpo} onChange={(event)=>{setMensagem(event.target.value)}}>
                    </textarea>

                    <div className="btn-box"><input className="btn-send" type="submit" value={"Enviar"}/></div>

                </form>

            {messages.reverse().map((message)=>(
                <div key={message.$id} className="dadosBox" >
                    <div className="menssagemBox">

                        <div className="header-mensagem">
                            <h1>{message.nome_user}</h1>
                            <small>{message.$createdAt}</small>
                        </div>

                        <div className="corpo-mensagem">
                            <p>{message.body}</p>
                            
                        </div>

                    </div>
                </div>
            ))}
            
        </div>
    )
}
export default Sala