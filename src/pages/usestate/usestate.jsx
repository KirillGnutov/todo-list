import React,{useState, useEffect, useReducer} from "react"

const UseStatePage = ()=>{
  const [counter, setCounter] = useState(0)
  
useEffect(()=>{
  console.log(counter)
},[counter])

  return(
    <div>
      <button onClick={()=> setCounter(counter + 1)}>+</button>
      {counter}
      <button onClick={()=> setCounter(counter - 1)}>-</button>
    </div>
  )
}

export default UseStatePage