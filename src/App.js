import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserInfo from "./Components/UserInfo";
import UserList from "./Components/UserList/UserList";
import SearchLine from "./Components/SearchLine";
import {ScrollToTop} from "./Components/ScrollToTop";

function App() {
    return (
        <div className="App">
            <h1 className="display-4">GitHub Search App</h1>
            <SearchLine/>
            <main>
                <UserList/>
                <UserInfo/>
            </main>
            <ScrollToTop/>
        </div>
    );
}

export default App;
