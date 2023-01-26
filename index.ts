import express from 'express';
import cors from 'cors';
const app = express();
const port = 8000; // default port to listen
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:truel
  })
)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
var listMessage: { text: string; author: string }[] = [];
var listNumber: number[] = [];
var listCalc: number[] = [];
app.get('/', (req, res) => {
  return res.json(listMessage);
});
app.route('/new').post(async (req, res) => {
  // post to add a new message to the list
  try{
    listMessage.push({ text: req.body.text, author: req.body.author });
    console.log("🚀 ~ file: index.ts:21 ~ app.route ~ listMessage", listMessage)
    return res.json(listMessage)
  } catch (error) {
    console.log(error);
    return res.send('Error');
  }
});

app.route('/update').post(async (req, res) => {
  try {
    if(req.body.reset===true){
      listNumber = listNumber.slice();
      listCalc = listCalc.slice();
      return res.json('reset');
    }
    if (listNumber.length === 0) {
      listNumber = [req.body.number];
      console.log(listNumber);
      return res.json(listNumber[0]);
    }
    // post to add a new number to the list
    listNumber.push(req.body.number);

    // calculate new number and the previous average

    listCalc.push((listNumber[listNumber.length - 1] + listNumber[listNumber.length - 2]) / 2);
    return res.json(listCalc[listCalc.length - 1])
  } catch (error) {
    console.log(error);
    return res.send('Error');
  }
});

app.route('/all').get(async (req, res) => {
  // get to get all the numbers
  return res.json({ listNumber, listCalc });
});