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
    const docRef = db.collection(COLLECTION_NAME).doc(req.body.postId);
    const getData = await docRef.get();
    if (getData.data().password === req.body.password) {
      docRef.delete();
    } else {
      return res.status(403).json("PASSWORD IS NOT MATCHED");
    }

    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
}
