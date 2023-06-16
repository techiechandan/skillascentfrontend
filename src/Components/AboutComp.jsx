import React from 'react'
import Image from 'react-bootstrap/Image'
import AboutImage from '../images/image.png'
import ListGroup from 'react-bootstrap/ListGroup';
const AboutComp = () => {
  return (
    <div className="container-fluid m-0 py-5 vh-md-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#fff9ee" }}>
      <div className="container text-center py-md-2 px-md-5 py-2" >
        <div className="row p-0 border border-md-1 border-0 rounded mb-4">
          <div className="col-md-7 col-12 order-2 order-md-1 align-items-md-center align-items-start d-flex">
            <p className="" style={{ textAlign: "justify" }}>
              At Skill Ascent, we are passionate about empowering individuals to reach new heights in their personal and professional development. We believe that knowledge is the key to success, and our e-learning platform is designed to provide you with the skills and tools you need to ascend to new levels of mastery.
            </p>
          </div>
          <div className="col-md-5 col-12 order-1 order-md-2">
            <Image src={AboutImage} alt="about image" fluid />
          </div>
        </div>
        <div className="container-fluid p-0 text-start">
          <div className="fw-bold fs-md-4 fs-3">
            Our Mission:
          </div>
          <p style={{ textAlign: 'justify' }}>
            Our mission is to make learning accessible and enjoyable for everyone. We aim to break down the barriers of traditional education by providing a platform that offers high-quality courses in a flexible and interactive format. Whether you're a student, a professional, or an aspiring entrepreneur, Skill Ascent is here to help you unlock your full potential.
          </p>
        </div>
        <div className="container-fluid p-0 text-start my-5">
          <div className="fw-bold fs-md-4 fs-5">
            Why Skill Ascent?
          </div>
          <ListGroup as="ul" numbered className="bg-transparent">
            <ListGroup.Item className="border-0 bg-transparent">
              <span className="fw-bold">Extensive Course Catalog:</span>
              <p style={{ textAlign: 'justify' }}>
                Our mission is to make learning accessible and enjoyable for everyone. We aim to break down the barriers of traditional education by providing a platform that offers high-quality courses in a flexible and interactive format. Whether you're a student, a professional, or an aspiring entrepreneur, Skill Ascent is here to help you unlock your full potential.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 bg-transparent">
              <span className="fw-bold">Expert Instructors:</span>
              <p style={{ textAlign: 'justify' }}>
                We take pride in working with industry experts and experienced professionals who are passionate about sharing their knowledge and expertise. Our instructors are carefully selected to ensure that you receive the highest quality instruction and guidance throughout your learning journey.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 bg-transparent">
              <span className="fw-bold">Flexibility and Convenience:</span>
              <p style={{ textAlign: 'justify' }}>
                We understand that everyone has different schedules and learning preferences. With Skill Ascent, you have the freedom to learn at your own pace, on your own time, and from anywhere in the world. Our platform is accessible on desktop, tablet, and mobile devices, so you can continue your learning journey wherever you go.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 bg-transparent">
              <span className="fw-bold ">Supportive Learning Community:</span>
              <p style={{ textAlign: 'justify' }}>
                At Skill Ascent, we believe in the power of community. As a student, you'll have access to our vibrant online community of learners, where you can connect with like-minded individuals, collaborate on projects, and seek guidance from your peers. Our instructors and support team are also readily available to answer any questions or provide assistance whenever you need it.
              </p>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="container-fluid p-0 text-start">
          <div className="fw-bold fs-md-4 fs-5">
            Start learning today
          </div>
          <p style={{ textAlign: 'justify' }}>
            Embark on your learning journey with Skill Ascent and join thousands of learners who have already experienced the transformative power of our e-learning platform. Whether you're looking to enhance your skills for career advancement or pursue a personal passion, we have the courses to help you succeed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutComp