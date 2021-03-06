import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../yoru-blog-firebase-sdk.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const COLLECTION_NAME = "comments";
    //　初期化する
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();

    const docRef = db.collection(COLLECTION_NAME).doc();
    const insertData = {
      postId: req.body.postId,
      username: req.body.username,
      password: req.body.password,
      comment: req.body.comment,
      replies: [],
      createdAt: new Date(),
    };
    docRef.set(insertData);

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
}
