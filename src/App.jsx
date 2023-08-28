import React from 'react';
import './App.css';
import BasicTable from './components/BasicTable';
import UserTable from './components/usertable/Index';

function App() {

  return (
    <div className="table-list">
      <div className="container">
        {/* <BasicTable /> */}
        <UserTable />
      </div>
    </div>
  );
}

export default App;
