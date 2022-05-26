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
      .where("email", "==", "jyol1234@gmail.com")
      .get();
    const responseContent = docRef.docs.map((doc: any) => doc.data());

    const data = {
      email: "jyol1234@gmail.com",
      password: "123456",
    };
    console.log(responseContent);
    res.status(200).json("success");
  } catch (err) {
    res.status(500).json(err);
  }
}
