import View from "./Components/View";
import Form from "./Components/Form";
import TTable from "./Components/Table";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TTable />} />
      <Route path="/edit/:id" element={<Form />} />
      <Route path="/view/:id" element={<View />} />
      <Route path="/add" element={<Form />} />
      <Route  path="*" element={<h2 style={{ color: '#fff' }} >404</h2>} />
    </Routes>
  );
}

export default App;
