import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import PostMessage from '../models/postMessage.js';
import logger1 from '../loger.js';

const router = express.Router();
export const getPosts = async (req:any, res:any) => {
    try {
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find()
const mydata:any ={
    data:posts,
    total:total
}
res.status(201).json(mydata);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
  const userId = uuidv4()

export const createPost = async (req:any, res:any) => {
    const post = req.body
    logger1.debug("About to Request to upload File")
    const newPostMessage = 
    new PostMessage({ ...post, createdAt: new Date().toISOString() })
    try {
      const resout= await newPostMessage.save();
      logger1.info("file Saved")
      res.status(201).json(resout);
    } catch (error) {
        res.status(409).json({ message: error});
        logger1.error('Failed')
    }
}