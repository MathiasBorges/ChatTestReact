import '../sign.css'
const SignIn = ()=>{
    return(

    <div id="container">
        <h1>Cadastrar</h1>
        <p id="primeiroP">Nome</p>
        <input type="text" placeholder="Username" id="nome"/>
        <p>Email</p>
        <input type="email" placeholder="Email" id="email"/>
        <p>Senha</p>
        <input type="password" placeholder="Password" id="senha"/>
        <button id="cad">Cadastrar</button>
    </div>

    )
}

export default SignIn