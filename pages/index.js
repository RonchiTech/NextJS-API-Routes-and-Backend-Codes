import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import {getFilePath,readFileData } from './api/feedback'
function MainPage(props) {
  const emailRef = useRef();
  const feedbackRef = useRef();

  // const [fetchData, setDataFetch] = useState([]);

  // useEffect(() => {
  //   fetch('/api/feedback').then((response) =>
  //     response.json().then((feedback) => setDataFetch(feedback.data))
  //   );
  // }, [fetchData]);

  function formSubmitHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    if (!email || !feedback) {
      return;
    }
    const feedbackObj = {
      email,
      feedback,
    };
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(feedbackObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    emailRef.current.value = '';
    feedbackRef.current.value = '';
  }
  // console.log(props.feedback);
  return (
    <div>
      <h1>Main Page</h1>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input id="email" type="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef} />
        </div>
        <button>Submit Feedback</button>
      </form>

      <ul>
        {props.feedback.map((data) => (
          <Link href={`/feedback/${data.id}`} key={data.id}>
            <li>
              <h2>{data.email}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // const response = await fetch('/api/feedback');
  // const feedback = await response.json();

  // const response = await fetch('http://localhost:3000/api/feedback');
  // const feedback = await response.json();
   const filePath = getFilePath();
   const fileData = readFileData(filePath);
   const data = JSON.parse(fileData)
  return {
    props: {
      feedback: data,
    },
    revalidate: 1,
  };
}
export default MainPage;
