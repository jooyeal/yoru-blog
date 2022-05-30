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
    let docRef = null;

    docRef = await db
      .collection(COLLECTION_NAME)
      .where("postId", "==", req.query.id)
      .get();

    const responseContent = docRef.docs
      .map((doc: any) => {
        return { id: doc.id, ...doc.data() };
      })
      .sort((a: any, b: any) => b.createdAt._seconds - a.createdAt._seconds);

    res.status(200).json(responseContent);
  } catch (err) {
    res.status(500).json(err);
  }
}
