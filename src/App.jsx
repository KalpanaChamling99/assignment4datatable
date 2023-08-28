import React from 'react';
import './App.css';
import BasicTable from './components/BasicTable';
import BasicTable2 from './components/BasicTable2';
import SortingTable from './components/SortingTable';

function App() {

  return (
    <div className="table-list">
      <div className="container">
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
        <BasicTable2 />
      </div>
    </div>
  );
}

export default App;
