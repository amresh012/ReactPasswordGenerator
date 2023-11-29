import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setlength] = useState(8) ;
  const [numberAllowed, setnumberAllowed] = useState(false) ;
  const [charAllowed, setCharAllowed] = useState(false); 
  const [password, setPassword] = useState(""); 

  const passwordGenerator = useCallback(() =>{
    let newPass = "";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqwxyz";
     if(numberAllowed) str +="0123456789";
     if(charAllowed) str += "!@#$%^&*(){}[]?/~_-=+`"

     for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length +1);
      newPass += str.charAt(char)
      
     }
     setPassword(newPass)
    
  } ,[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToclipboard = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  } ,[length,numberAllowed,charAllowed, passwordGenerator])

    const passwordref=  useRef(null)


  return (
    <div className=" bg-black w-screen h-screen flex flex-col justify-center items-center">
     <h1 className='text-center text-white text-4xl font-bold py-4'>Password Generator</h1>
      <div className="w-[500px] h-[200px] bg-gray-700 rounded-md">
        <div className="input-holder p-2 flex  w-full justify-center">
          <input
           type="text"
           className='px-2 placeholder:px-2 text-orange-400 w-full'
           placeholder='type...'
           readOnly
           value={password}
           ref={passwordref}
            />
            <button className='bg-blue-400 p-2 text-white font-medium uppercase'
          onClick={copyPasswordToclipboard}
            >Copy</button>
        </div>
        <div className=" flex justify-around items-center p-2">
          <input type="range"
          value={length}
          min={6}
          max={100}
          className= "cursor-pointer text-white "
          onChange={(e) =>{setlength(e.target.value)}}
        />
          <label className='text-white'>Length: <span className='font-bold text-red-400 italic'>{length}</span></label>
          <input type="checkbox"
           id="number"
           defaultChecked = {numberAllowed}
           onChange={()=>{setnumberAllowed((prev)=>!prev)}}
          
          />
          <label htmlFor="number" className='text-white'>Number</label>
          <input type="checkbox" id="Character"
           defaultChecked = {charAllowed}
           onChange={()=>{setCharAllowed((prev)=>!prev)}}
          />
          <label htmlFor="Character"className='text-white'>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App
