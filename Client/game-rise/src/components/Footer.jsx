import React from "react";

const Footer = () => {
  return (
    <>
      <footer 
      className="footer footer-center text-primary-content p-10 bg-[url('https://i.pinimg.com/564x/90/9a/d2/909ad238365dbdd7ee088110a24edb39.jpg')] hero-overlay bg-opacity-60 "
      >
        <aside>
          <p className="text-slate-100" >
            Copyright © ${new Date().getFullYear()} - All right reserved by Game Rise Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
