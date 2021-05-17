import {getFilePath,readFileData} from './feedback'

function handler(req,res){
  

    const feedbackId = req.query.id;
    

    const filePath = getFilePath();
    const fileData = readFileData(filePath);

    const parseFileData = JSON.parse(fileData)
    // console.log('FEED',feedbackId);
    // console.log('DATA', parseFileData);
    const feedbackData = parseFileData.find((feed) => feed.id === feedbackId);
    // const parseData = JSON.parse(feedbackData)
    console.log(feedbackData);

    
    res.status(200).json({ feedback: feedbackData });
}
export default handler;