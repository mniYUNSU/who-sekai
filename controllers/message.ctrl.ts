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

async function list(req: NextApiRequest, res: NextApiResponse) {
  const { uid, page, size } = req.query;
  if (uid === undefined) {
    throw new BadReqError('uid가 누락되었습니다.');
  }

  const convertPage = page === undefined ? '1' : page;
  const convertSize = size === undefined ? '10' : size;
  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const pageToStr = Array.isArray(convertPage) ? convertPage[0] : convertPage;
  const sizeToStr = Array.isArray(convertSize) ? convertSize[0] : convertSize;

  const listResp = await MessageModel.listWithPage({
    uid: uidToStr,
    page: parseInt(pageToStr, 10),
    size: parseInt(sizeToStr, 10),
  });
  return res.status(200).json(listResp);
}

async function postReply(req: NextApiRequest, res: NextApiResponse) {
  const { uid, reply, messageId } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid가 누락되었습니다.');
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId가 누락되었습니다.');
  }
  if (reply === undefined) {
    throw new BadReqError('reply가 누락되었습니다.');
  }

  await MessageModel.postReply({ uid, reply, messageId });
  return res.status(201).end();
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { uid, messageId } = req.query;
  if (uid === undefined) {
    throw new BadReqError('uid가 누락되었습니다.');
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId가 누락되었습니다.');
  }

  const uidToStr = Array.isArray(uid) ? uid[0] : uid;
  const messageIdToStr = Array.isArray(messageId) ? messageId[0] : messageId;

  const data = await MessageModel.get({ uid: uidToStr, messageId: messageIdToStr });
  return res.status(200).json(data);
}

const MessageCtrl = { post, list, postReply, get };

export default MessageCtrl;
