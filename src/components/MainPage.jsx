// MainPage.js
import React from 'react';
import NavBar from './NavBar';
import FormComponent from './FormComponent';
import '../css/MainPage.css';
const MainPage = () => {
  return (
    <>
       <NavBar />
       <div className="MainContainer">
      <FormComponent />
      </div>
    </>
  );
};

export default MainPage;
