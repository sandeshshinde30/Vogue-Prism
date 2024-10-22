import Navbar from "../components/Navbar"
import SiteInsights from "../components/SiteInsights"
import "../css/about.css"


function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="about-wrapper" id="aw">
                <div className="container">
                    <div className="about">
                        <div className="box text-box">
                            <h2>About Us</h2>
                            <p>We are market leaders since 1992</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit similique placeat sint? Quidem fugit non ab, </p>
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

