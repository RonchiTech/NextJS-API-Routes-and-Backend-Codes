import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function FeedBack() {
  const router = useRouter();
  const [resultFeedback, setResultFeedback] = useState({});
  const feedbackId = router.query.feedbackId;
  console.log(feedbackId);

  useEffect(() => {
    fetch(`/api/${feedbackId}`)
      .then((response) => response.json())
      .then((data) => setResultFeedback(data.feedback));
  }, [feedbackId]);

  return (
    <div>
      {resultFeedback && (
        <div>
          <h2>Feedback from {resultFeedback.email} </h2>
          <p>{resultFeedback.feedback}</p>
        </div>
      )}
    </div>
  );
}
export default FeedBack;
