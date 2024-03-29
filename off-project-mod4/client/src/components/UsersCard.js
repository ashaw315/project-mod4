import React, { useState, useEffect } from "react";
import {NavLink, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import ReviewCard from "./ReviewCard";



function UsersCard({b, selectUser, currentUser}) {
const [user, setUser] = useState([]);
const [usersReviews, setUsersReviews] = useState([])

    
const { id } = useParams();

        useEffect(() => {
            fetch(`/users/${id}`)
            .then((r) => r.json())
            .then((data) => {
                setUser(data);
                setUsersReviews(data.reviews);
            });
        }, [id]);



    const navigate = useNavigate();

    console.log("UserCard user", user)
    const all_topics = user.unique_topics?.map((topic) => {
        return (
            <div>
              <p key={topic.id}>{topic.title}</p>
            </div>
        )
    });
   

    return(
        <div className="card">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <p>{user.username}</p>
            <div className="project-image">
              <img src={user.image_url} />
            </div>
            <p>{user.bio}</p>
            <p>Reviews Posted</p>
            {usersReviews?.map((review) => <ReviewCard key={review.id} r={review} user={currentUser} setReviews={setUsersReviews}/> )}
        </div>
    )

}

export default UsersCard;