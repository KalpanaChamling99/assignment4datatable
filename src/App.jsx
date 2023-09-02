import React,{useState} from 'react';
import './App.css';
import './stylesheets/master.scss';

import BasicTable from './components/BasicTable';
import PaginateTable from './components/PaginateTable';
import ComplexTable from './components/complex/ComplexTable';
function App() {
  const [showBasicTable,setShowBasicTable] = useState(false);
  const [showpaginateTable,setShowPaginateTable] = useState(false);
  const [showComplexTable,setShowComplexTable] = useState(true)

  const showTableHelper = (basic,paginate,complex) =>{
    setShowBasicTable(basic);
    setShowPaginateTable(paginate);
    setShowComplexTable(complex);
  }
  const basicTableHandler = (e) =>{
    e.preventDefault();
    showTableHelper(true,false,false);
  }
  const PaginateTableHandler = (e) => {
    e.preventDefault();
    showTableHelper(false,true,false);
  }
  const complexTableHandler = (e)=>{
    e.preventDefault();
    showTableHelper(false,false,true);
  }
  return (
    <>
      <div className="sidebar">
        <ul>
          <li onClick={basicTableHandler}>Basic Table</li>
          <li onClick ={PaginateTableHandler}>Paginate Table</li>
          {/* <li>Sorting Table</li> */}
          {/* <li>Filter Table</li> */}
          <li onClick={complexTableHandler}>Complex Table</li>
        </ul>
      </div>
      <div className="content">
          <div className="container">
            {showBasicTable && <BasicTable />}
            {showpaginateTable && <PaginateTable />}
            {showComplexTable && <ComplexTable />}
        </div>
      </div>
    </>
  );
}

export default App;
