import './admin.css';
import {useState, useEffect} from 'react';
import {auth, db} from '../../firebaseConnection';
import {signOut} from 'firebase/auth';
import {addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc} from 'firebase/firestore';

export default function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({});
    const [tarefas, setTarefas]= useState([]);
    const [edit, setEdit]= useState([]);


    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.Uid))
                const unsub = onSnapshot(q,(snapshot)=>{
                    let lista =[];
                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista)
                })
            }
        }
        loadTarefas();
    },[])

    async function handleRegister(e){
        e.preventDefault();      
        
        if(tarefaInput === ''){
            alert("Digite sua tarefa...")
            return;
        }
        await addDoc(collection(db,"tarefas"),{
            tarefa:tarefaInput,
            created:new Date(),
            userId:user?.uid
        })
        .then(()=>{
            alert("Tarefa registrada!")
            setTarefaInput('')
        }).catch((error)=>{
            alert("Erro ao registrar!")
        })
    }

    async function handleLogout(){
        await signOut(auth);
    }

    async function deletarTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    function editarTarefa(item){
        setTarefaInput(item.tarefa)
        setEdit(item);
        
    }

    return(
        <div className="admin-container">
            <h1>My tasks</h1>

            <form className="form" onSumit={handleRegister}>
                <textarea placeholder="Digite sua tarefa..." value={tarefaInput} onChange={(e)=>setTarefaInput(e.target.value)}/>
                <button className="btn-register" type="submit">Registrar tarefa</button>
            </form>

            {tarefas.map((item)=>(
                <article className="list">
                    <p>{item.tarefa}</p>
    
                    <div>
                        <button onClick={()=> editarTarefa(item)}>Editar</button>
                        <button className="btn-delete" onClick={()=> deletarTarefa(item.id)}>Concluir</button>
                    </div>
                </article>
            ))}

            <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
    )
}