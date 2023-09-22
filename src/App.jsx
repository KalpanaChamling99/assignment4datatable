import React,{useState} from 'react';
import './App.css';
import './stylesheets/master.scss';

import BasicTable from './components/BasicTable';
import PaginateTable from './components/PaginateTable';
import ComplexTable from './components/complex/ComplexTable';
import GroupingTable from './components/grouping/Index';
import UserTable from './components/usertable/Index';
import SelectionTable from './components/Selection/Index';

function App() {
  const [showBasicTable,setShowBasicTable] = useState(false);
  const [showpaginateTable,setShowPaginateTable] = useState(false);
  const [showComplexTable,setShowComplexTable] = useState(false);
  const [showGroupingTable,setShowGroupingTable] = useState(false);
  const [showUserTable,setShowUserTable] = useState(false);
  const [showRowSelectionTable,setShowRowSelectionTable] = useState(true);

  const showTableHelper = (basic,paginate,complex,grouping,usertable,rowSelectionTable) =>{
    setShowBasicTable(basic);
    setShowPaginateTable(paginate);
    setShowComplexTable(complex);
    setShowGroupingTable(grouping);
    setShowUserTable(usertable);
    setShowRowSelectionTable(rowSelectionTable);
  }
  const basicTableHandler = (e) =>{
    e.preventDefault();
    showTableHelper(true,false,false,false,false,false);
  }
  const PaginateTableHandler = (e) => {
    e.preventDefault();
    showTableHelper(false,true,false,false,false,false);
  }
  const complexTableHandler = (e)=>{
    e.preventDefault();
    showTableHelper(false,false,true,false,false,false);
  }
  const groupingTableHandler = (e) => {
    showTableHelper(false,false,false,true,false,false);
  }
  const userTableHandler = (e) => {
    showTableHelper(false,false,false,false,true,false);
  }
  const rowSelectionTableHandler = () => {
    showTableHelper(false,false,false,false,false,true);
  }
  return (
    <>
      <div className="sidebar">
        <ul>
          <li onClick={basicTableHandler}>Basic Table</li>
          <li onClick ={PaginateTableHandler}>Paginate Table</li>
          <li  onClick={complexTableHandler}>Complex Table</li>
          <li onClick={groupingTableHandler}>Grouping Table</li>
          <li className='active--' onClick={rowSelectionTableHandler}>Row Selection Table</li>
          <li className='active--' onClick={userTableHandler}>User Table</li>
        </ul>
      </div>
      <div className="content">
        <div className="container">
          {showBasicTable && <BasicTable />}
          {showpaginateTable && <PaginateTable />}
          {showComplexTable && <ComplexTable />}
          {showGroupingTable && <GroupingTable />}
          {showUserTable && <UserTable />}
          {showRowSelectionTable && <SelectionTable />}
        </div>
      </div>
    </>
  );
}

export default App;
