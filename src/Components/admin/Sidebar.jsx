import { React,useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
// incons
import { FaWindows, FaUserFriends, FaClipboardList, FaWhmcs, FaEllo,FaAlignJustify } from 'react-icons/fa'



const Sidebar = ({ openState,setOpenState }) => {

  const menuList = [
    {
      logo: <FaWindows />,
      name: "Dashboard",
      path:"/admin/dashboard"
    },
    {
      logo: <FaUserFriends />,
      name: "Users",
      path:"/admin/users"
    },
    {
      logo: <FaClipboardList />,
      name: "Course List",
      path:"/admin/course-list"
    },
    {
      logo: <FaWhmcs />,
      name: "Site",
      path:"/admin/site-settings"
    },
    {
      logo: <FaWhmcs />,
      name:"Query",
      path:"/admin/queries"
    }
  ]

  const [CurrentWidth,setCurrentWidth] = useState(window.innerWidth);
  const resizeHandler = ()=>{
    setCurrentWidth(window.innerWidth);
  }
  window.addEventListener('resize',resizeHandler);


  return (
    <div className={CurrentWidth < 768?"vh-100 bg-light ps-3 position-fixed start-0 bg-light":"vh-100 ps-3 bg-light"} style={openState ? {width:'300px',zIndex:"100000"}  : CurrentWidth < 768 ?{ marginLeft: '-70px',transition: "0.3s" }:{width:"90px",transition: "0.3s"}}>
      <div className="ps-3 pt-2 mb-0 wrap-element d-flex align-items-center">
        <span className="fs-3 mb-1 text-primary me-2"><FaEllo /></span>
        <span className="fs-3 fw-bold text-primary me-auto" style={openState ? { display: 'block' } : { display: 'none' }}>Skill Ascent</span>
        {openState&& CurrentWidth < 768 &&
          <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={()=>{setOpenState(!openState)}}>
            <FaAlignJustify />
        </Button>
        }
      </div>
      <hr className="m-0 p-0 wrap-element"></hr>

      <ul className="p-0" >
        {
          menuList.map((item, index) =>
          (
            <li key={index} className=" py-1 my-2 wrap-element" >
              <Link to={item.path}  className="d-flex align-items-center ps-3 text-dark wrap-element">
                <span className="fs-4 me-2 pb-1">{item.logo}</span>
                <span className="fs-5" style={openState ? { display: 'block'} : { display: 'none',transition: "0.3s" }}>{item.name}</span>
              </Link>
            </li>
          )
          )
        }
      </ul>
    </div>
  )
}

export default Sidebar