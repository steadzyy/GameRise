import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import DarkTheme from "../helper/DarkTheme"
import Footer from "./Footer"


function MainLayout() {
    return(
        <div style={{margin: 0}}>
        
        <Navbar/>
        <DarkTheme />
        <Outlet/>
        <Footer/>
        </div>
    )
}

export default MainLayout