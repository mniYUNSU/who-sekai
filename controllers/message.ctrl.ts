import { NextApiResponse, NextApiRequest } from 'next';
import MessageModel from '@/models/message/message.model';
import BadReqError from './error/bad_request_error';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { uid, message, author } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid가 누락되었습니다.');
  }
  if (message === undefined) {
    throw new BadReqError('message가 누락되었습니다.');
  }

  await MessageModel.post({ uid, message, author });
  return res.status(201).end();
}

const MessageCtrl = { post };

export default MessageCtrl;
