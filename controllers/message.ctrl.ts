import { NextApiResponse, NextApiRequest } from 'next';
import FirebaseAdmin from '@/models/firebase_admin';
import CustomServerError from '@/controllers/error/custom_server_error';
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

async function updateMessage(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;
  if (token === undefined) {
    throw new CustomServerError({ statusCode: 401, message: '권한이 없습니다.' });
  }
  let tokenUid: null | string = null;
  try {
    const decode = await FirebaseAdmin.getInstance().Auth.verifyIdToken(token);
    tokenUid = decode.uid;
  } catch (error) {
    throw new BadReqError('token에 문제가 있습니다.');
  }
  const { uid, deny, messageId } = req.body;
  if (uid === undefined) {
    throw new BadReqError('uid가 누락되었습니다.');
  }
  if (uid !== tokenUid) {
    throw new CustomServerError({ statusCode: 401, message: '수정 권한이 없습니다..' });
  }
  if (messageId === undefined) {
    throw new BadReqError('messageId가 누락되었습니다.');
  }
  if (deny === undefined) {
    throw new BadReqError('reply가 누락되었습니다.');
  }

  const result = await MessageModel.updateMessage({ uid, deny, messageId });
  return res.status(200).json(result);
}

const MessageCtrl = { post, list, postReply, get, updateMessage };

export default MessageCtrl;
