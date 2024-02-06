import express from 'express';
import { createPost, getPosts } from '../controller/post';

import multer from 'multer';
 
const app = express();
const port = 3000;
 
app.use(express.json());
 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/', getPosts);

router.post('/creator', createPost);

export default router;