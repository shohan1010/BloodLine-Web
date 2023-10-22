import logo from './logo.svg';
import './App.css';

function App() {

    function donateNow() {
        alert("Thank you for your willingness to donate blood. Your contribution can save lives!");
    }
    
  return (
    <div>
    <header>
        <h1>Blood Donation </h1>
        <nav>
            <ul>
                <li className="inline-block mx-2"><a href="#" className="text-white">Home</a></li>
                <li className="inline-block mx-2"><a href="#" className="text-white">SearchDonor</a></li>
                <li className="inline-block mx-2"><a href="#" className="text-white">RequestDonor</a></li>
                <li className="inline-block mx-2"><a href="#" className="text-white">Register</a></li>
                <li className="inline-block mx-2"><a href="#" className="text-white">Login</a></li>
            </ul>
        </nav>
    </header>

    <section id="hero">
        <h2>Welcome to our Blood Donation </h2>
        <p>Help save lives by donating blood. Your contribution can make a difference.</p>
        <button className="btn" onClick={donateNow}>Donate Now</button>
    </section>

    <section id="about">
        <h2>About Us</h2>
        <p>We are a non-profit organization dedicated to saving lives by providing a safe and efficient blood donation service.</p>
    </section>
    

    <section id="donors">
        <h2>Our Donors</h2>
        
    </section>

    <section id="recipients">
        <h2>Recipients in Need</h2>
        
    </section>

    <section id="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, please feel free to contact us.</p>
    </section>

    <footer>
        <p>&copy; 2023 Blood Donation </p>
    </footer>

   


    
</div>
  );
 
}

export default App;
