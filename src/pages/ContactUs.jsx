import React from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
// import '../css/contact.css';

function ContactUs() {
    return (
        <>
            <Navbar />
            <section className="contact-form">
                <div className="container">
                    <div className="cf address b-s">
                        <p className="addr-h">
                            <FontAwesomeIcon icon={faLocationDot} /> Location
                        </p>
                        <p className="addr-d">#261 Janakwadi Colony, Latur, Maharashtra</p>
                        <p className="addr-h">
                            <FontAwesomeIcon icon={faEnvelope} /> E-mail
                        </p>
                        <p className="addr-d">bablu@gmail.com</p>
                        <p className="addr-h">
                            <FontAwesomeIcon icon={faSquarePhone} /> Call
                        </p>
                        <p className="addr-d">+917575891645</p>
                        <img className="b-s" src="../home.jpeg" alt="Shop Photo" />
                    </div>
                    <form className="cf form b-s">
                        <h2 className="md-heading">Contact Us</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod vitae fugiat quas blanditiis architecto alias pariatur reiciendis modi officia corrupti?</p>
                        <label htmlFor="un">Username</label>
                        <input type="text" id="un" required />
                        <label htmlFor="em">Email</label>
                        <input type="email" id="em" required />
                        <label htmlFor="ph">Phone</label>
                        <input type="number" id="ph" required />
                        <label htmlFor="cmt">Comment</label>
                        <textarea id="cmt" cols="30" rows="7"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default ContactUs;
