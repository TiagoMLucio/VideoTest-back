import {
  NextFunction, Request, Response, Router,
} from 'express';
import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const routes = Router();

const videoStorage = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()
      }${path.extname(file.originalname)}`);
    },
  }),
  s3: multerS3({
    s3: new aws.S3({ region: process.env.AWS_REGION }),
    bucket: 'uploadvideoteste',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()
      }${path.extname(file.originalname)}`);
    },
  }),
};

const videoUpload = multer({
  storage: videoStorage.s3,
  limits: {
    fileSize: 100 git* 10000000, // 10000000 Bytes = 10 MB
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
  const { location: url = '' } = req.file as unknown as {location: string};
  res.send({ url });
}, (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send({ error: error.message });
});

export default routes;
