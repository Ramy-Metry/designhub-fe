import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import ProfileIcon from './Icons/ProfileIcon';
import CreateNewProjectIcon from './Icons/CreateNewProjectIcon';
import MyProjectsIcon from './Icons/MyProjectsIcon';
import InboxIcon from './Icons/InboxIcon';
import SettingsIcon from './Icons/SettingsIcon';

import '../SASS/Navbar.scss';

const Navbar = ({ activeUser }) => {
  const [bool, setBool] = useState(null);

  useEffect(() => {
    const getNotifyBool = async id => {
      const { data } = await axiosWithAuth().get(`api/v1/invite/bool/${id}`);

      setBool(data);
    };
    getNotifyBool(activeUser.id);
  }, [activeUser.id]);

  function hoverByClass(classname,hoverover="white",hoverout="#6d6d72"){
        let items= document.getElementsByClassName(classname);
        for(let i = 0;i < items.length;i++){
          items[i].onmouseover = () => {
            for(let j = 0;j < items.length;j++){
              items[j].style.color=hoverover;
            }
          }
          
          items[i].onmouseout = () => {
            for(let j = 0;j < items.length;j++){
              items[j].style.color=hoverout;
            }
          }
        }
      }
      hoverByClass("profile-nav-items");
      hoverByClass("newproject-nav-items");
      hoverByClass("explore-nav-items");
      hoverByClass("inbox-nav-items");
      hoverByClass("settings-nav-items");

  return (
    <nav>
      <div className="icon-links">
        <div className="navlinks">
          <NavLink className = "profile-nav-items"
            to={`/profile/${activeUser.id}/${activeUser.username}`}
            activeClassName="active-links"
          >
            <div className="ProfileIcon">
              <ProfileIcon />
            </div>
          </NavLink>
        </div>

        <div className="navlinks">
          <NavLink className = "newproject-nav-items"
          to="/create" activeClassName="active-links">
            <CreateNewProjectIcon />
          </NavLink>
        </div>

        <div className="navlinks">
          <NavLink className = "explore-nav-items"
          to="/explore" activeClassName="active-links">
            <MyProjectsIcon />
          </NavLink>
        </div>

        <div className="navlinks">
          <NavLink className = "inbox-nav-items"
            to={`/notifications/${activeUser.id}/${activeUser.username}`}
            activeClassName="active-links"
          >
            <InboxIcon onClick={() => setBool(false)} />
            {bool ? <span className="notification-indicator">•</span> : ''}
          </NavLink>
        </div>

        <div className="navlinks">
          <NavLink className = "settings-nav-items"
          to="/settings" activeClassName="active-links">
            <SettingsIcon />
          </NavLink>
        </div>
      </div>
      <div className="text-links">
        <NavLink className = "links profile-nav-items"
          to={`/profile/${activeUser.id}/${activeUser.username}`}
          activeClassName="active-links"
        >
          Profile
        </NavLink>

        <NavLink className = " links newproject-nav-items"
        to="/create" activeClassName="active-links">
          New Project
        </NavLink>

        <NavLink className = "links explore-nav-items"
        to="/explore" activeClassName="active-links">
          Explore
        </NavLink>

        <NavLink className = "links inbox-nav-items"
          to={`/notifications/${activeUser.id}/${activeUser.username}`}
          activeClassName="active-links"
        >
          <span onClick={() => setBool(false)}>Notifications</span>
        </NavLink>

        <NavLink className = "links settings-nav-items"
          to="/settings"
          activeClassName="active-links"
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
