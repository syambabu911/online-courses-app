
import './App.css';
import Buttons from './components/Buttons';
import Home from './components/Home';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import Register from './components/Register';
import './cssfolder/Buttons.css';
import './cssfolder/loginform.css';
import './cssfolder/home.css';
import './cssfolder/courses.css';
import './cssfolder/overview.css';
import './cssfolder/plan.css';
import './cssfolder/coursedetails.css';
import './cssfolder/scanner.css';
import './cssfolder/transaction.css';
import './cssfolder/redirect.css';
import './cssfolder/content.css';
import './cssfolder/coursefolders.css';
import './cssfolder/chatapp.css';
import './cssfolder/broadcast.css';
import './cssfolder/profileform.css';
import './cssfolder/notification.css';
import './cssfolder/search.css';
import './cssfolder/toggle.css';
import './cssfolder/helpsupport.css';
import './cssfolder/ratings.css';
import './cssfolder/downloads.css';
import './cssfolder/Register.css';
import './cssfolder/ChatList.css';
import './cssfolder/MessageList.css';
import './cssfolder/SendMessage.css';

import { Routes, Route, useNavigate,} from 'react-router-dom';
import Courses from './components/Courses';
import Plan from './components/Plan';
import CourseDetails from './components/CourseDetails';
import ScanVisible from './components/ScanVisible';
import Transaction from './components/Transaction';
import Redirect from './components/Redirect';
import Content from './components/Content';
import CourseFolders from './components/CourseFolders';
import Downloads from './components/Downloads';
import ChatApp from './components/ChatApp';
import Broadcast from './components/Broadcast';
import ProfileForm from './components/ProfileForm';
import ImageNotification from './components/ImageNotification';
import Search from './components/Search';
import Toggle from './components/Toggle';
import Helpsupport from './components/Helpsupport';
import Rating from './components/Rating';
import Reset from './components/Reset';
import Overviewdetails from './components/Overviewdetails';
import LogoutButton from './components/LogoutButton';
import Email from './components/Email';
import TopicList from './components/TopicList';
import ResourceList from './components/ResourceList';
import Tests from './components/Tests';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import Test3 from './components/Test3';
import Test4 from './components/Test4'; 
import Quiz from './components/Quiz';
import Share from './components/shareOptions';
import Payments from './components/Payments';
import HowToUseApp from './components/HowToUseApp';
import React, { useState,useEffect} from 'react';
import Chatlist from './components/Chatlist';





function App() {
  const [downloads, setDownloads] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      alert('please check buttons componet visible off?')
      setShowButtons(true);
    }
  }, []);

  const addDownload = (resource) => {
    setDownloads((prevDownloads) => [...prevDownloads, resource]);
  };
  return (
    <div>
          {showButtons && <Buttons />}
      <Routes>
        <Route path="/login" element={   <LoginScreen/>} />
        <Route path="/register" element={   <Register/>} />
        <Route path="/email" element={   <Email/>} />
        <Route path="/reset" element={   <Reset/>} />
        <Route path="/buttons" element={<Buttons/>} />
        <Route path="/home" element={   <Home/>} />
        <Route path="/courses" element={   <Courses/>} />
        <Route path="/overview/:courseId" element={   <Overviewdetails/>} />
        <Route path="/plan/:courseId" element={   <Plan/>} />
        <Route path="/details/:courseId/:planId/" element={   <CourseDetails/>} />
        <Route path="/scanqr" element={   <ScanVisible/>} />
        <Route path="/transaction" element={   <Transaction/>} />
        <Route path="/redirect" element={   <Redirect/>} />
        <Route path="/content" element={   <Content/>} />
        <Route path="/coursefolders/:demoClassId" element={<CourseFolders />} />
        <Route path="/topics/:subjectId" element={<TopicList />} />
        <Route path="/resources/:topicId" element={<ResourceList addDownload={addDownload} />}/>
        <Route path="/downloads" element={<Downloads downloads={downloads} />} />
        {/* <Route path="/chatapp" element={   <ChatApp/>} /> */}
        <Route path="/broadcast" element={   <Broadcast/>} />
        <Route path="/profile" element={   <ProfileForm/>} />
        <Route path="/alerts" element={   <ImageNotification/>} />
        <Route path="/search" element={   <Search/>} />
        <Route path="/menu" element={   <Toggle/>} />
        <Route path="/helpsupport" element={   <Helpsupport/>} />
        <Route path="/ratings" element={   <Rating/>} />
        <Route path="/logout" element={   <LogoutButton/>} />
        <Route path="/tests" element={   <Tests/>} />
        <Route path="/tests" element={   <Quiz/>} />
        <Route path="/test1" element={   <Test1/>} />
        <Route path="/test2" element={   <Test2/>} />
        <Route path="/test3" element={   <Test3/>} />
        <Route path="/test4" element={   <Test4/>} />
        <Route path="/share" element={   <Share/>} />
        <Route path="/payments" element={<Payments/>} />
        <Route path="/how-to-use-the-app" element={<HowToUseApp/>} />
        <Route path="/chatlist" element={<Chatlist />} />

      </Routes>
   </div>
  );
}

export default App;
