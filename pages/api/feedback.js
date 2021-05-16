import fs from 'fs';
import path from 'path';

function getFilePath() {
const filePath = path.join(process.cwd(), 'data', 'feedback.json');
return filePath
}
function readFileData() {
  const filePath = getFilePath()
  const fileData = fs.readFileSync(filePath)
  return fileData
}
function feedbackHandler(req, res) {
  //check type if request
  if (req.method === 'POST') {
    //get req body
    const email = req.body.email;
    const feedback = req.body.feedback;

    const feedbackData = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    //store it to database or something(file)
    const filePath = path.join(process.cwd(), 'data', 'feedback.json');
    const fileData = readFileData();
    const data = JSON.parse(fileData);
    data.push(feedbackData);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: feedbackData });
  } else {
    
    const fileData = readFileData();
    const data = JSON.parse(fileData)
    res.status(200).json({ message: 'This works!', data });
  }
}
export default feedbackHandler;
