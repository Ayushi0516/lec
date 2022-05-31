import React, { useEffect } from "react";
import {  useState } from "react";
import axios from "axios";

const Todos=()=>
{
      const[newTodo,setNewTodo]=useState("");
      const [todos,setTodos]=useState([]);
      const [totalCount, setTotalCount] = useState(0);
      const [page, setPage] = useState(1);
      const [limit, setLimit] = useState(5);

    const save=()=>{
        fetch(" http://localhost:8080/todos",{
          method:"POST",
          headers:{
              "content-type":"application/json",
          },
          body:JSON.stringify({
              value:newTodo,
              isCompleted:false,
          }) 
        })
        .then((r)=>{ 
          return r.json()
          })
        .then((d)=>{
        setTodos([...todos,d]);
          setNewTodo("");
        });
       
    };
    useEffect(()=>{
      setTimeout(() => {
        axios
          .get(`http://localhost:8080/Todos?_page=${page}&_limit=${limit}`)
          .then((r) => {
            setTodos(r.data);
            setTotalCount(+r.headers["x-total-count"]);
          });
      }, 1000);  
  

    },[page, limit]);

    return  (
      <div>
      <h1>Todo App</h1>
      <button
        disabled={page <= 1}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        {"<"}
      </button>
      <input
        type="number"
        placeholder="Enter Page Limit"
        onChange={(e) => setLimit(+e.target.value)}
      />
      <button
        disabled={totalCount < page * limit}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {">"}
      </button>
      <div>
        <input
          placeholder="Enter Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button disabled={!newTodo} onClick={save}>
          +
        </button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="elements">
          <p>{todo.id}.</p> <p>{todo.value}</p>
        </div>
      ))}
    </div>
  );
    
};
export default Todos;