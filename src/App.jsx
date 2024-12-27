import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Navbar from "./components/Navbar"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  //input text
  const [todo, setTodo] = useState("")
  //array of todo
  const [todos, setTodos] = useState([])
  const [showFinished,setshowFinished]=useState(true)

  useEffect(()=>{
    let todoString=localStorage.getItem("todos");
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos);
    }
    
  },[])

  const saveToLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished);
  }

  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id);
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e,id) => {
    // alert(`It is a delete id ${id}`);
    // let index=todos.findIndex(item=>{
    //   return item.id===id;
    // })
    // console.log(index);

    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS();
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox=(e)=>{
    console.log(e,e.target)
   let id= e.target.name
   console.log(`The id is ${id}`)
   let index=todos.findIndex(item=>{
    return item.id  === id;
   })
   console.log(index);
   let newTodos=[...todos];
   newTodos[index].isCompleted=!newTodos[index].isCompleted;
   setTodos(newTodos)
  //  console.log(newTodos,todos);
   saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 hover:bg-[#c3b5fd54 ] min-h-[80vh] w-[90vw] md:w-[60vw]">
      <h1 className='font-bold text-xl text-center'>iTask - Manager your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col ">

          <h2 className='text-lg font-bold my-2'>Add a Todo</h2>

          <div className='flex gap-3'>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-xl py-1 px-1 bg-transparent border' />

<button onClick={handleAdd} disabled={todo.length<=3} className=' bg-violet-800 hover:bg-violet-950 p-3 py-1 my-1 text-sm font-bold text-white rounded-xl disabled:bg-violet-400'>Save</button>
          </div>

        </div>

        <label><input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        
        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">

          {todos.length===0 && <div className='bg-red-500 m-5 text-white rounded-lg flex justify-center '>No Todos to display</div>}
            
          {todos.map(item => {
            
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-5">

             <div className='flex gap-3'>
             <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=""/>
             <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
             </div>

              <div className="buttons h-full flex">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-[#c3b5fd34] hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-[#c3b5fd55]  hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>


      </div>

    </>
  )
}

export default App
