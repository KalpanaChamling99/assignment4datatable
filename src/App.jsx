import React,{useState} from 'react';
import './App.css';
import './stylesheets/master.scss';

import BasicTable from './components/BasicTable';
import PaginateTable from './components/PaginateTable';

function App() {
  const [showBasicTable,setShowBasicTable] = useState(false);
  const [showpaginateTable,setShowPaginateTable] = useState(true);

  const showTableHelper = (basic,paginate) =>{
    setShowBasicTable(basic);
    setShowPaginateTable(paginate);
  }
  const basicTableHandler = (e) =>{
    e.preventDefault();
    showTableHelper(true,false);
  }
  const PaginateTableHandler = (e) => {
    e.preventDefault();
    showTableHelper(false,true);
  }
  return (
    <>
      <div className="sidebar">
        <ul>
          <li onClick={basicTableHandler}>Basic Table</li>
          <li onClick ={PaginateTableHandler}>Paginate Table</li>
          <li>Sorting Table</li>
          <li>Filter Table</li>
        </ul>
      </div>
      <div className="content">
          <div className="container">
            {showBasicTable && <BasicTable />}
            {showpaginateTable && <PaginateTable />}
        </div>
      </div>
    </>
  );
}

export default App;
