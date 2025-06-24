import React, { useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/locationSearchPanel";

const Home = () => {
  const [pickup, SetPickup] = useState("");
  const [destination, SetDestination] = useState("");
  const [panelOpen, SetPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  }
   useGSAP(() =>{
       gsap.to(panelRef.current, {
        height: panelOpen ? "70%" : "0%",
        padding: 20,
        duration: 0.7,
        ease: "power2.inOut",
    })
    }, [panelOpen]);
  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-3 top-2"
        src="https://logospng.org/download/uber/logo-uber-4096.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://th.bing.com/th/id/OIP._0rSU5b1l_1q_2CNBBvuSQHaHa?rs=1&pid=ImgDetMain"
          alt=""
        />
      </div>
      <div className=" absolute top-0 w-full h-screen flex flex-col justify-end ">
        <div className="h-[30%] p-5 bg-white relative">
          <h5 onClick={()=>SetPanelOpen(false)} className="absolute top-6 right-6 text-3xl"><i class="ri-arrow-down-wide-fill"></i></h5>
          <h4 className="text-2xl font-semibold ml-5">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            action=""
          >
            <div className="line  absolute h-16 w-1 top-[37%] left-10 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onChange={(e) => {
                SetPickup(e.target.value);
                SetPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-xl  mt-1.5 ml-3 w-[95%]"
              type="text"
              placeholder="Add a pick-up-location"
            />
            <input
              value={destination}
              onChange={(e) => {
                SetDestination(e.target.value);
                SetPanelOpen(true);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-xl  mt-2 mb-2 ml-3 w-[95%]"
              type="text"
              placeholder="Enter your Destination"
            />
          </form>
          </div>
        <div ref={panelRef} className=" bg-white h-0 ">
              {panelOpen && <LocationSearchPanel />}
        </div>
         
      </div>
    </div>
  );
};

export default Home;
