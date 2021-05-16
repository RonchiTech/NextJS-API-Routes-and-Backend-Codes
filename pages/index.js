import { useRef } from 'react';

function MainPage() {
  const emailRef = useRef();
  const feedbackRef = useRef();

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
    </div>
  );
}
export default MainPage;
