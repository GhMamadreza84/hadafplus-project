import Drawer from "./components/module/Drawer";
import SearchInput from "./components/module/SearchInput";
import Select from "./components/module/Select";
import TableContainer from "./components/module/TableContainer";

function App() {
  return (
    <div className="font-sans p-4">
      <div className="w-full flex justify-between items-center">
        <Drawer />
        <div className="w-2/5 flex gap-10">
          <Select />
          <SearchInput />
        </div>
      </div>
      <TableContainer />
    </div>
  );
}

export default App;
