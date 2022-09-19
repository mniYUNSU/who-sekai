import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { InMessage } from '@/models/message/in_message';
import convertDateToString from '@/utils/convert_date_to_string';
import MoreBtnIcon from './more_btn_icon';
import FirebaseClient from '@/models/firebase_client';

interface Props {
  uid: string;
  displayName: string;
  photoURL: string;
  isOwner: boolean;
  item: InMessage;
  onSendComplete: () => void;
  screenName: string;
  onDeleteComplete: () => void;
}

const MessageItem = function ({
  uid,
  screenName,
  isOwner,
  displayName,
  onSendComplete,
  photoURL,
  item,
  onDeleteComplete,
}: Props) {
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const toast = useToast();

  const messageBoxColor = useColorModeValue('white', '#393649');
  const messageBoxReplyColor = useColorModeValue('gray.100', '#504e62');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const messageBoxInputColor = useColorModeValue('gray.100', 'gray.900');

  async function postReply() {
    const resp = await fetch('/api/messages.add.reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, messageId: item.id, reply }),
    });
    if (resp.status < 300) {
      onSendComplete();
    }
  }

  async function updateMessage({ deny }: { deny: boolean }) {
    const token = await FirebaseClient.getInstance().Auth.currentUser?.getIdToken();
    if (token === undefined) {
      toast({ title: '로그인한 사용자만 사용할 수 있는 메뉴입니다.' });
      return;
    }
    const resp = await fetch('/api/messages.deny', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ uid, messageId: item.id, deny }),
    });
    if (resp.status < 300) {
      onSendComplete();
    }
  }

  async function deleteMessage() {
    const token = await FirebaseClient.getInstance().Auth.currentUser?.getIdToken();
    if (token === undefined) {
      toast({ title: '로그인한 사용자만 사용할 수 있는 메뉴입니다.' });
      return;
    }
    const resp = await fetch(`/api/messages.delete?uid=${uid}&messageId=${item.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', authorization: token },
    });
    if (resp.status < 300) {
      onDeleteComplete();
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const haveReply = item.reply !== undefined;
  const isDeny = item.deny !== undefined ? item.deny === true : false;

  function autoLink(message: string) {
    const Rexp =
      /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?/=~_|!:,.;]*)[-A-Z0-9+&@#/%=~_|])/gi;

    const replacedMessage = message.replace(Rexp, "<div><a href='$1' target='_blank'>📎 $1</a></div>");
    return replacedMessage;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <Box borderRadius="md" width="full" bg={messageBoxColor} boxShadow="md">
        <Box>
          <Flex px="2" pt="2" alignItems="center">
            <Avatar
              size="xs"
              src={item.author ? item.author.photoURL ?? 'https://bit.ly/broken-link' : 'https://bit.ly/broken-link'}
            />
            <Text fontSize="xx-small" ml="1.5">
              {item.author ? item.author.displayName : 'Anonymous'}
            </Text>
            <Text whiteSpace="pre-line" fontSize="xx-small" color={dateColor} ml="1">
              {convertDateToString(item.createAt)}
            </Text>
            <Spacer />
            {isOwner && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MoreBtnIcon />}
                  width="24px"
                  height="24px"
                  borderRadius="full"
                  variant="link"
                  size="xs"
                />
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      updateMessage({ deny: item.deny !== undefined ? !item.deny : true });
                    }}
                  >
                    {isDeny ? '공개로 만들기' : '비공개로 만들기'}
                  </MenuItem>
                  {window.location.href === `${window.location.origin}/${screenName}` && (
                    <MenuItem
                      onClick={() => {
                        window.location.href = `/${screenName}/${item.id}`;
                      }}
                    >
                      이야기 상세 보기
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      deleteMessage();
                    }}
                  >
                    이야기 삭제 하기
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Box>
        <Box p="2">
          <Box borderRadius="md" borderWidth="1px" p="2">
            {isMounted ? (
              <Text whiteSpace="pre-line" fontSize="sm" dangerouslySetInnerHTML={{ __html: autoLink(item.message) }} />
            ) : (
              <Text whiteSpace="pre-line" fontSize="sm">
                {item.message}
              </Text>
            )}
          </Box>
          {haveReply && (
            <Box pt="2">
              <Divider />
              <Box display="flex" mt="2">
                <Box pt="2">
                  <Avatar size="xs" src={photoURL} mr="2" />
                </Box>
                <Box borderRadius="md" p="2" width="full" bg={messageBoxReplyColor}>
                  <Flex alignItems="center">
                    <Text fontSize="xs">{displayName}</Text>
                    <Text whiteSpace="pre-line" fontSize="xs" color={dateColor} ml="1">
                      {convertDateToString(item.replyAt!)}
                    </Text>
                  </Flex>

                  {item.reply ? (
                    <Text
                      whiteSpace="pre-line"
                      fontSize="xs"
                      mt="1.5"
                      dangerouslySetInnerHTML={{ __html: autoLink(item.reply) }}
                    />
                  ) : (
                    <Text whiteSpace="pre-line" fontSize="xs" mt="1.5">
                      {item.reply}
                    </Text>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          {haveReply === false && isOwner && (
            <Box pt="2">
              <Divider />
              <Box display="flex" mt="2">
                <Box pt="1">
                  <Avatar size="xs" src={photoURL} mr="2" />
                </Box>

                <Box borderRadius="md" width="full" bg={messageBoxInputColor} mr="2">
                  <Textarea
                    border="none"
                    boxShadow="none !important"
                    resize="none"
                    minH="unset"
                    overflow="hidden"
                    fontSize="sm"
                    placeholder="댓글을 입력해주세요"
                    as={ResizeTextarea}
                    value={reply}
                    onChange={(e) => {
                      setReply(e.currentTarget.value);
                    }}
                  />
                </Box>
                <Button
                  disabled={reply.length === 0}
                  color="white"
                  bgColor="blue.400"
                  isLoading={!!loading}
                  colorScheme="blue"
                  variant="solid"
                  size="sm"
                  onClick={async () => {
                    setLoading(true);
                    await postReply();
                    setLoading(false);
                  }}
                >
                  등록
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MessageItem;
