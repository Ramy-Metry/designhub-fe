import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import defaultImg from '../ASSETS/default_thumbnail.svg';

import { axiosWithAuth } from '../utilities/axiosWithAuth';

import '../SASS/ProjectThumbnail.scss';

const ProjectThumbnail = ({ project }) => {

    // Set initial state to avoid undefined errors
    const [user, setUser] = useState({
        avatar: null,
        firstName: null,
        username: null
    });

    useEffect(() => {
        if (!project || !project.userId) return;

        axiosWithAuth()
            .get(`/api/v1/users/${project.userId}`)
            .then(res => {
                setUser(res.data[0]);
            })
            .catch(err => {
                console.error('Failed to load user with id', project.userId);
            })
    }, [setUser, project])

    return !project ? null : (
        <div className="project-content">
            <Link to={`/project/${project.id}`}>
                <div className="project-info">
                    <div className='project-flex'>
                        <img className='avatar' src={user.avatar} alt={user.firstName} />
                        <div className="project-middle">
                            {project.name.length > 15 ? (
                                <h1>{project.name.slice(0, 15)}...</h1>
                            ) : (
                                    <h1>{project.name}</h1>
                                )}
                            
                            {user.username !== null && user.username.length > 15 ? (
                                <h1>{user.username.slice(0, 15)}...</h1>
                            ) : (
                                    <h1 className = "project-username">{user.username}</h1>
                                )}
                        </div>
                        <div className="created">
                            <h1>{moment(project.created_at).format('MM-DD-YY')}</h1>
                        </div>
                    </div>
                </div>
                <img
                    src={project.mainImg ? project.mainImg : defaultImg}
                    className="project-thumbnail"
                    alt="test"
                    key={project.id}
                />
            </Link>
        </div>
    )
}

export default ProjectThumbnail;
