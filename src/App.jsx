
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage/SearchPage";
import CharacterPage from "./components/CharacterPage/CharacterPage";


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage/>}/>
        <Route path="character/:id" element={<CharacterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
