import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">BuzzNet</h2>
          <p className="mt-2">Connect with friends, share photos, and more!</p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center justify-center md:justify-start">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl mr-6"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl mr-6"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} BuzzNet. All rights reserved. - <a href="https://rajib-sadhu.github.io/" className='underline' >Rajib Sadhu</a> </p>
      </div>
    </footer>
  );
};

export default Footer;
