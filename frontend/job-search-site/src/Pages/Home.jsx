import React from 'react';
import Header from '../Components/Header.jsx';
import SearchJob from '../Components/SearchJob.jsx';
import DisplayJob from '../Components/DisplayJob.jsx';

export default function Home(){
    

    return (
        <div>
            <Header />
            <SearchJob />
            <DisplayJob />
        </div>
    )
}