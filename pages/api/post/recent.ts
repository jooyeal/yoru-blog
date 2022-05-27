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
    const COLLECTION_NAME = "posts";
    //　初期化する
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();

    const docRef = await db
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();
    const responseContent = docRef.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    res.status(200).json(responseContent);
  } catch (err) {
    res.status(500).json(err);
  }
}
