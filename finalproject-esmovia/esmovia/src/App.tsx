
import { useEffect, useState } from 'react'
import './App.css'
import { Answer, FetchTodo } from './interfaces';
import bringTodo from './services/api-calls';

function App() {

  const [todos, setTodos] = useState<FetchTodo[]>([])

  useEffect(()=>{
    if(todos.length === 0){

      const bringTd = async (): Promise<void> => {
        
        let answer : Answer = await bringTodo()

        console.log(answer, "i ammmmm")

        setTodos(answer.data)  // --> Main thing of the function :)
      } 

      bringTd()
    }
  },[todos]);

  return (
    <>
     {
      todos?.length > 0 

      ? 

      (<div>{todos?.length}</div>)

      :

      (<div>nein!</div>)
     }
    </>
  )
}

export default App;