import {
  NextFunction, Request, Response, Router,
} from 'express';
import multer from 'multer';
import path from 'path';

const routes = Router();

const videoStorage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'tmp'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()
    }${path.extname(file.originalname)}`);
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(_req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'));
    }
    return cb(null, true);
  },
});

routes.post('/uploadVideo', videoUpload.single('video'), (req: Request, res: Response) => {
  res.send(req.file);
}, (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send({ error: error.message });
});

export default routes;
