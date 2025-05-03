import Drawer from "./components/module/Drawer";
import DrawerForm from "./components/module/DrawerForm";
import SearchInput from "./components/module/SearchInput";
import Select from "./components/module/Select";
import TableContainer from "./components/module/TableContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="font-sans p-4">
      <div className="w-full flex justify-between items-center">
        <Drawer>
          <DrawerForm />
        </Drawer>
        <div className="w-2/5 flex gap-10">
          <Select />
          <SearchInput />
        </div>
      </div>
      <TableContainer />

      <ToastContainer />
    </div>
  );
}

export default App;
