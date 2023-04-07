import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import FillForm from './pages/FillForm';
import GroupPage from './pages/GroupPage';
import ChatGroup from './pages/ChatGroup';
import createJoinForm from './index2.js'; 
import initChat from './chat';



function App() {
  return (

    <main className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/FillForm" element={<FillForm />} />
          <Route path="/GroupPage" element={<GroupPage /> }/> 
          <Route path="/Chat" element={<ChatGroup />} />
          <Route path="/createJoinForm" element={<createJoinForm/>}/>
          <Route path="/initChat" element={<initChat/>}/>
          
        </Routes>
        
        
      </Router>
    </main>
  );
}

export default App;