import { useEffect, useRef, useState } from 'react'


function App() {
  const [show,setShow]=useState(true)
  const [result, setResult] = useState([])
  const [input,setInput]=useState('')
  const ref=useRef()
 

  useEffect(()=>{
    async function search(){
      ref.current=setTimeout(async()=>{
     let res=await axios.get(`https://api.github.com/search/users?q=${input}`, {headers: {Authorization: `Bearer ${token}`  }});
      setResult(res.data.items.slice(0,5))
      //console.log(input)
      },1000)
    }
    search()
    return ()=>clearInterval(ref.current)
  },[input])

  return (
    <>
     <div className='container mx-auto flex justify-center items-center mt-10 flex-col gap-10'>
      <input type="text" value={input} onChange={(e)=>{setInput(e.target.value);
        if(!show)setShow(true);
      }} placeholder='search username'  />
      {show?<Show arr={result} setShow={setShow} setInput={setInput}/>:''}
      

     </div>
    </>
  )
}

function Show({arr,setInput,setShow}){

function clicked(name){
  setInput(name)
  setShow(false)
}
console.log(arr)

  return (
    <>
       {!arr||arr.length==0?<div>loading...</div>:arr.map((curr,i)=>{
        return <button key={i} onClick={()=>clicked(curr.login)}>{curr.login}</button>
       })}
    </>
  )
}

export default App
