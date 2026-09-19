//import styling
import "./globals.css";

//import components
import Navbar from "./components/Navbar";
import GenArt from "./components/GenArt";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="page-content">
          <Navbar />
          <ContactForm />
          {children}
          <Footer />
        </div>
        <GenArt />
      </body>
    </html>
  );
}
