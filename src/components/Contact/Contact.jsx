"use client";

import React from "react";
import ContactUs from "../Home/ContactUS";

const Contact = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white">
      <ContactUs isHomePage={false} />
    </div>
  );
};

export default Contact;
