import './App.css';
import FaceIntegrate from './components/face_int';
import FaceValidation from './components/face_val';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Loading from './components/loading';
import MainScreen from './components/main';
import React from 'react'
import ProfileScreen from './AI/profile' 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {storage,auth } from './firebase'
import About from './AI/about';
import Cv from './AI/cv';
import ImageGeneration from './AI/image_generation';
import Pricing from './AI/pricing';
 

function App() {
  // Save the original console.error function
 
  const fetchimg = ()=>{

    const ref2 = ref(storage,auth.currentUser.uid + "/profileimg.jpg")
    getDownloadURL(ref2).then((snap)=>{
      console.log(snap)
      localStorage.setItem("image",snap)
    }).catch(()=>{
       
      localStorage.setItem("image","https://cdn-icons-png.flaticon.com/512/149/149071.png") 
    })
  }
React.useEffect(()=>{
// Save the original console.error function
const originalConsoleError = console.error;
 
console.error = (...args) => {
  // Check if the error message includes the specific error you want to ignore
  if (typeof args[0] === 'string' && args[0].includes('db._checkNotDeleted is not a function')) {
    return;
  }
  // Call the original console.error function for other messages
  originalConsoleError(...args);
};

// Similarly, if you want to suppress warnings
const originalConsoleWarn = console.warn;

console.warn = (...args) => {
  // Check if the warning message includes the specific warning you want to ignore
  if (typeof args[0] === 'string' && args[0].includes('Specific warning message to ignore')) {
    return;
  }
  // Call the original console.warn function for other messages
  originalConsoleWarn(...args);
};

},[])
 
 


  return (
    <div className="App">
    <BrowserRouter>
 
 
 
  <Routes>
  <Route path="/" Component={MainScreen}/>
  <Route path="/loading" Component={Loading}/>
  <Route path="/Login" Component={Login}/>
  <Route path="/validation" Component={FaceValidation}/>

  <Route path="home" element={<Home/>}>
  <Route path="profile" element={<ProfileScreen image={fetchimg}/>}/> 
  <Route path="about" element={<About  />}/> 
  <Route path="pricing" element={<Pricing  />}/> 
 
  <Route path="cv" element={<Cv  />}/> 
 
  <Route path="image_gen" element={<ImageGeneration  />}/> 
  </Route>
  <Route path="/int" Component={FaceIntegrate}/>
  
  </Routes>
 

  </BrowserRouter>
    </div>
  );
}

export default App;
