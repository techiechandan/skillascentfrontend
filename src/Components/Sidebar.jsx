import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams,Link } from 'react-router-dom'
const Sidebar = ({ openHandler, opentStatus, topics }) => {

  const params = useParams();
 

  return (
    <div className="sidebar pt-4 mt-md-5  ps-4 ps-md-2" style={{ backgroundColor: "#fffaf2", marginLeft: opentStatus ? "0px" : "-400px" }}>
      <ListGroup >
        {topics.length > 0 &&
          topics.map((item, index) => {
            return (
              <ListGroup.Item as ={Link}  to={`/learn/${params.courseName}/${item.slug}`}  key={index} className = "bg-transparent border-0 py-0">
                {item.topic}
              </ListGroup.Item>
            )
          })

        }
      </ListGroup>
    </div>
  )
}

export default Sidebar