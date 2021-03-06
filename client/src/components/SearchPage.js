import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import empty from './Icons/empty_project.svg';

import SearchUserCard from './SearchUserCard';

import ProjectThumbnail from './ProjectThumbnail';

import '../SASS/SearchPage.scss';
import '../SASS/UserProfile.scss';

class SearchPage extends Component {
  displayUsers = () => {
    return this.props.searchData.users.map((user, index) => {
      return <SearchUserCard user={user} key={index} />;
    });
  };

  displayProjects = () => {
    return this.props.searchData.projects.map(project => {
      return <ProjectThumbnail project={project} />;
    });
  };

  render() {
    const noProjects =
      !this.props.searchData.projects || !this.props.searchData.projects.length;
    const noUsers =
      !this.props.searchData.users || !this.props.searchData.users.length;

    return (
      <div className="search-container">
        <p>
          results for <span>{this.props.searchTerm}</span>
        </p>
        <div className="search-tabs-container">
          <Tabs>
            <TabList className="nav-links">
              <Tab className="links" selectedClassName="active-link">
                Projects
              </Tab>
              <Tab className="links" selectedClassName="active-link">
                Users
              </Tab>
            </TabList>
            <div className="tabs-container">
              <TabPanel className='results-container'>
                {noProjects && (
                  <div className="empty">
                    <img alt='empty' className="empty-icon" src={empty} />
                    <p>No projects found!</p>
                  </div>
                )}
                <div className="projects-array">
                  {this.props.searchData.projects && this.displayProjects()}
                </div>
              </TabPanel>
              <TabPanel className='results-container'>
                {noUsers && (
                  <div className="empty">
                    <img alt='empty' className="empty-icon" src={empty} />
                    <p>No users found!</p>
                  </div>
                )}
                <div className="users-array">
                {this.props.searchData.users && this.displayUsers()}
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default SearchPage;
