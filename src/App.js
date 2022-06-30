import View from "./Components/View";
import Form from "./Components/Form";
import Main from "./Components/Main";
import TTable from "./Components/Table";
import DataTable from "./Components/DataTable";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Main />} /> */}
      <Route path="/" element={<TTable />} />
      {/* <Route path="/" element={<DataTable />} /> */}
      <Route path="/edit/:id" element={<Form />} />
      <Route path="/view/:id" element={<View />} />
    </Routes>
  );
}

export default App;
