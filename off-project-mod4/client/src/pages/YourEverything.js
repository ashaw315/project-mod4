import React, { useEffect, useState } from "react";
import UserDetailCard from "../components/UserDetailCard";
import ReviewCard from "../components/ReviewCard";
import UserReviews from "../components/UserReviews";

function YourEverthing({ user }) {

  // const [yourTopics, setYourTopics] = useState([]);
  // const [youReviews, setYourReviews] = useState([]);
  const [allReviews, setReviews] = useState([]);


  useEffect(() => {
    // auto-login
    fetch("/reviews")
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setReviews(data));}
          else {
            r.json().then((err) => {
                alert(err.errors);
            })
        }
      });
  }, []);
  
  // console.log("reviews?: " + yourTopics);



  // console.log("You: " + you);

  // useEffect(() => {
  //   setYourTopics(you.unique_topics);
  //   setYourReviews(you.reviews);
  // }, []);

  // console.log("Your Topics:" + yourTopics);
     
  // console.log("yourTopics: " + yourTopics);

  // const allTopics = you.topics.map((r) => {
  //   <div>
  //   <li>{r.title}</li>
  //   <UserReviews reviews={r.reviews} />
  //   </div>
  // });

  //{t.reviews?.map((review) => <ReviewCard key={review.id} r={review} /> )}
  const usersReviews = allReviews.filter((r) => (r.user == user.username));
  


  // console.log("Usewr's Reviews: " + usersReviews);


  return (
    <div>
      {!user?<h1>You're a nobody! Go log in!</h1>:null}

       {user?<UserDetailCard selectedUser={user} />:null}

      {usersReviews?.map((r) => <ReviewCard key={r.id} r={r} reviews={allReviews} setReviews={setReviews} user={user}/>)}

    </div>

  )
}

export default YourEverthing;