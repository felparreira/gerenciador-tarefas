import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './home.css';

export default function Home(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('')
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if (email !== '' && password !== ''){
            await signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                navigate('/admin',{replace:true})
            }).catch(()=>{
                alert('Erro ao fazer login!')
            })
        }else{
            alert('Preencha todos os campos!')
        }
    }

    return(
        <div className="home-container">
            <h1>Task Manager</h1>
            <span>Gerencie suas tarefas de forma simples.</span>

            <form className="form" onSubmit={handleLogin}>
                <input type="text" placeholder="Digite seu email." value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Acessar</button>
            </form>

            <Link className="button-link" to="/register">
                Não possui uma conta? Cadastre-se aqui!
            </Link>

        </div>
    )
}
