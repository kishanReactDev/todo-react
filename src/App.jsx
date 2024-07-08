import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {


  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [showFinished, setshowFinished] = useState(true)


  useEffect(() => {
    saveToLS(todos)
  }, [todos])


  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplited: false }])
    setTodo('')
  }


  const handleEdit = (id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
  }

  const handleDelete = (id1) => {
    let id = id1;
    console.log(id);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos)
  }

  const toggleFinished = (e) => {

    setshowFinished(!showFinished)

  }

  return (

    <>
      <Navbar />
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]'>
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-md px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 text-sm font-bold mx-2 text-white disabled:bg-violet-500 rounded-md '>Save</button>
          </div>
        </div>
        <input className='my-4' type="checkbox" id='show' onChange={toggleFinished} checked={showFinished} />
        <label htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-15 w-[90%] my-2 mx-auto"></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos To Display</div>}
          {todos.map(item => {


            return (showFinished || !item.isComplited) && <div key={item.id} className="todo flex  my-3 justify-between" >
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isComplited} id="" />
                <div className={item.isComplited ? 'line-through' : ''}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={() => { handleEdit(item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white founded-md mx-1 '><FaEdit /></button>
                <button onClick={() => { handleDelete(item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white founded-md mx-1 '><MdDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
