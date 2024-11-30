import React, { useEffect } from "react";
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import NavBar from "../../components/NavBar/NavBar";
import emailjs from '@emailjs/browser';
import "./aboutUs.css";
import NavBar from "../../components/NavBar/NavBar";

const AboutUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');

                // If there's no token, user is not logged in
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }

                // Check login status with the token
                const response = await axios.get("https://secondproject-8lyv.onrender.com/api/check-login/", {
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                    withCredentials: true
                });

                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
                localStorage.removeItem('token');
            }
        };


    // Initialize EmailJS with your User ID
    emailjs.init(process.env.REACT_APP_EMAIL_JS_USER_ID);// Replace with your actual public key
    checkAuthStatus();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const message = event.target.message.value.trim();

    if (!name || !email || !message) {
      alert("All fields are required!");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Send email using EmailJS
    emailjs.sendForm(
      process.env.REACT_APP_EMAIL_JS_SERVICE_ID,     // Replace with your service ID
      process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,    // Replace with your template ID
      event.target,
      process.env.REACT_APP_EMAIL_JS_USER_ID      // Replace with your public key
    )
    .then((result) => {
        alert('Feedback sent successfully!');
    event.target.reset();
}, (error) => {
    console.error('Full Email Send Error:', error);
    console.error('Error Code:', error.status);
    console.error('Error Text:', error.text);
    alert(`Failed to send message. Error: ${error.text}`);
});
  };

  return (
      <>
        {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
          <h1 className="message">We hope you enjoyed Nostalgify! 🎵</h1>
          <p className="link-message">
            Click <a href="https://group22project.weebly.com" target="_blank" rel="noopener noreferrer" className="link">here</a> to
            learn more about our team + our process behind this web app!
          </p>

          <form className="feedback-container" onSubmit={handleSubmit}>
            <p className="form-message">Got any Feedback? Let us know!</p>
            <div className="form-label1">Your Name:</div>
            <input
                type="text"
                name="name"
                className="form-input1"
                required
            />
            <div className="form-label1">Your Email:</div>
            <input
                type="email"
                name="email"
                className="form-input1"
                required
            />
            <div className="form-label1">Your Feedback:</div>
            <textarea
                name="message"
                className="form-input1"
                required
            ></textarea>
            <button type="submit" className="feedback-button">Send Feedback</button>
          </form>
      </>

  );
};

export default AboutUs;

