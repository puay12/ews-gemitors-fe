import "./navbar.scss"

export const Navbar = () => {
    return (
        <div className="navbar d-flex align-items-center justify-content-end">
            <div className="icons">
                <div className="user">
                    <img src="/avatar-female.jpg" alt="" />
                    <span>Jamila</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar