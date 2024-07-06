import { NavLink } from "react-router-dom"
import "./sidebar.scss"

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="item d-flex flex-column">
                <div className="logo d-flex align-items-center justify-content-center">
                    <img src="/logo.png" alt=""/>
                    <span>EWS Gemitors</span>
                </div>
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : "listItem"}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="listItemTitle">Data Pasien</span>
                </NavLink>
                <NavLink to="/ews-table" className={({ isActive }) => isActive ? "active" : "listItem"}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V9M9 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V9M9 3V21M3 9V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H9M3 9H21M21 9V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H9" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="listItemTitle">Early Warning Score</span>
                </NavLink>
                <NavLink to="/protocols" className={({ isActive }) => isActive ? "active" : "listItem"}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8V12" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 16H12.01" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="listItemTitle">Daftar Protokol</span>
                </NavLink>
            </div>
            <div className="footer d-flex align-items-center justify-content-center">
                <span>© PENS Surabaya, All Reserved</span>
            </div>
        </div>
    )
}

export default Sidebar