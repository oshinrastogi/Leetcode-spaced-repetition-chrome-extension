import { v4 as uuidv4 } from 'uuid';
import Problem from '../models/problemModel.js';

export const addProblem = async (req, res) => {
  try {
    const { title, url, email } = req.body;

    if (!title || !url || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingProblem = await Problem.findOne({ title, email });
    if (existingProblem) {
      console.log("problem already added !")
      return res.status(200).send({
        success: true,
      });
    }

    const newProblem = new Problem({
      id: uuidv4(),
      title,
      url,
      email,
      addedDate: new Date(), 
    });

    await newProblem.save();
    res.status(201).send({
      success:true,
    });

  } catch (err) {
    console.error('Error saving problem:', err);
    res.status(500).send({
      success:false,
    });
  }
  
};
