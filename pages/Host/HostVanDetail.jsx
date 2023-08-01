import React from "react";
import { Outlet, Link, useParams, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const HostVanDetail = () => {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState(null);

  const activeStyle = {
    color: "#161616",
    fontWeight: "bold",
    textDecoration: "underline"
  }

  axios.get(`/api/host/vans/${id}`).then((res) => setCurrentVan(res.data.vans));

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="van-detail-container">
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink to="." end style={({isActive}) => isActive ? activeStyle : null}>Details</NavLink>
          <NavLink to="pricing" style={({isActive}) => isActive ? activeStyle : null}>Pricing</NavLink>
          <NavLink to="photos" style={({isActive}) => isActive ? activeStyle : null}>Photos</NavLink>
        </nav>

        <Outlet context={{currentVan}}/>
      </div>
    </section>
  );
};

export default HostVanDetail;
