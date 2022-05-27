import type { NextApiRequest, NextApiResponse } from "next";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../yoru-blog-firebase-sdk.json"); // 秘密鍵を取得
const admin = require("firebase-admin");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const COLLECTION_NAME = "users";
  //　初期化する
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(serviceAccount),
      });
    }
    const db = getFirestore();

    const docRef = await db
      .collection(COLLECTION_NAME)
      .where("email", "==", req.body.email)
      .where("password", "==", req.body.password)
      .get();
    const responseContent = docRef.docs.map((doc: any) => doc.data());
    if (responseContent.length !== 0) {
      res.status(200).json("login success");
    } else {
      res.status(403).json("login failed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
