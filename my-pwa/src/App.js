import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddToHomeScreenButton from './AddtoScreen';

function App() {

  const analytics = () => console.log("Analytics");

  analytics();

  const handleAddToHomeScreen = () =>  console.log("AddToHomeScreen");

  const filteredValues = leads.map(()=>{
    return leads.filter((item)=> item.id === id)

  })

  

  const data = leads.map ((item)=>{
    return(
      <li key={item.id}>
        {item.name}
      </li>
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <AddToHomeScreenButton/>
      </header>
      <h1 className='text-red-400'> This is me Muhammad Zahid Khan</h1>
    </div>
  );
}

export default App;
