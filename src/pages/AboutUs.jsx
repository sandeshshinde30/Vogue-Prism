import Navbar from "../components/Navbar"
import SiteInsights from "../components/SiteInsights"
import "../css/about.css"


function AboutUs() {
    return (
        <>
            <Navbar/>
            <div className="about-wrapper" id="aw">
                <div className="container">
                    <div className="about">
                        <div className="box text-box">
                            <h2>About Us</h2>
                            <p>We are market leaders since 1992</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus enim sit animi voluptate voluptates amet consequuntur possimus, tenetur assumenda nulla, odit porro suscipit, aliquid aut autem laboriosam! Ipsam, eius dolor.
                            Nihil temporibus eligendi ipsam, magni suscipit, animi quos deserunt dolore ad libero voluptates optio debitis vitae omnis recusandae nam perspiciatis nesciunt tempore cum nostrum non odit eos molestiae earum. Totam! </p>
                        </div>
                        <div className="box image-box">
                            <img src="../home.jpeg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <SiteInsights/>
        </>
    )
}


export default AboutUs;

