import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        if (email !== '' && password !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin', {replace:true})
            }).catch(()=>{
                alert('Erro ao fazer cadastro!')
            })
        }else{
            alert('Preencha todos os campos!')
        }
    }

    return(
        <div className="home-container">
            <h1>Create new Account</h1>
            <span>Gerencie suas tarefas de forma simples.</span>

            <form className="form" onSubmit={handleRegister}>
                <input type="text" placeholder="Digite seu email." value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>

            <Link className="button-link" to="/">
                Já possui uma conta? Faça login!
            </Link>

        </div>
    )
}
