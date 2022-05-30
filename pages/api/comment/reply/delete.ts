import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../yoru-blog-firebase-sdk.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const COMMENTS_COLLECTION = "comments";
    const REPLIES_COLLECTION = "replies";
    //　初期化する
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();
    const repliesDoc = db.collection(REPLIES_COLLECTION).doc(req.body.replyId);
    const getReplyData = await repliesDoc.get();
    if (getReplyData.data().password === req.body.password) {
      repliesDoc.delete();
    } else {
      return res.status(403).json("PASSWORD IS NOT MATCHED");
    }

    const commentsDocRef = db
      .collection(COMMENTS_COLLECTION)
      .doc(req.body.commentId);
    const getCommentData = await commentsDocRef.get();
    const updateData = {
      replies: [
        ...getCommentData
          .data()
          .replies.filter((reply: string) => reply !== req.body.replyId),
      ],
      updatedAt: new Date(),
    };
    commentsDocRef.update(updateData);

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
}
