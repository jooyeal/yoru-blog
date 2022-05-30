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
    const repliesDoc = db.collection(REPLIES_COLLECTION);
    const insertData = {
      username: req.body.username,
      password: req.body.password,
      comment: req.body.comment,
      createdAt: new Date(),
    };
    const replyData = await repliesDoc.add(insertData);

    const commentsDocRef = db
      .collection(COMMENTS_COLLECTION)
      .doc(req.body.commentId);
    const getData = await commentsDocRef.get();
    const updateData = {
      replies: [...getData.data().replies, replyData.id],
      updatedAt: new Date(),
    };

    commentsDocRef.update(updateData);

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
}
