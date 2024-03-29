import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { NavLink } from 'react-router-dom';
import TopicCard from "../components/TopicCard";


function EveryEverthing({ user, setCurrentTopic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [topicTitle, setTopicTitle] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [rating, setRating] = useState("1");
    const [textContent, setTextContent] = useState("");
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        // auto-login
        fetch("/topics")
            .then((r) => r.json()
                .then((data) => setTopics(data))
            );
    }, []);

    function closeModal() {
        setIsOpen(false);
        setRating("1");
        setTopicTitle("");
        setReviewTitle("");
        setTextContent("");
    };

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/topics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "topic": {
                    title: topicTitle,

                    
                },
                "review": {
                        user_id: user.id,
                        title: reviewTitle,
                        rating: rating,
                        text_content: textContent
                    }
               
            })
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) =>{
                        setTopics([data, ...topics]);
                        closeModal()
                    });
                } else {
                    r.json().then((err) => {
                        setErrors(err.errors);
                        alert(err.errors);
                    })
                }
            });
    }


    // const topics_list = topics?.map((t) => {
    //     return <li key={t.id}><NavLink to={`/every/${t.title}`}><button onClick={() => setCurrentTopic(t.id)}>{t.title}</button></NavLink></li>
    // })

    return (
        <div>
            <p>EveryEverthing</p>

            <Modal open={isOpen}>
                {errors.map((e) => <p key={e}>{e}</p>)}
                <form onSubmit={handleSubmit}>
                    <label>Topic:</label>
                    <input
                        type="text"
                        value={topicTitle} //change title to topic title in backend?
                        onChange={(e) => setTopicTitle(e.target.value)}
                        required
                    />
                    <p>Review your topic!</p>
                    <label>Review Title: </label>
                    <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        required
                    />
                   <label>Review Rating: </label>
                    <select value={rating} name="rating" onChange={(e) => setRating(e.target.value)}>
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                    </select>
                    <label>Review Text: </label>
                    <textarea
                        type="textarea"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={() => closeModal()}> Close </button>
            </Modal>

            <button onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to do this")}> Create Topic </button>

            {topics?.map((t) =>
                <p className="topics-card" key={t.id}>
                    <NavLink to={`/every/${t.title}`}>
                        <button className="button-topic" onClick={() => setCurrentTopic(t.id)}>
                            {t.title}
                        </button>
                    </NavLink>
                </p>
            )}
        </div>

    )
}

export default EveryEverthing;