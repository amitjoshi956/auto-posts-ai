import { onRequest } from 'firebase-functions/v2/https';
import { db } from '@src/index';



export const getNextPost = onRequest(async (req, res) => {
  const nextPostRef = db.collection('posts').doc('nextPost');
  const doc = await nextPostRef.get();

  if (!doc.exists) {
    res.json({
      hasErrors: true,
      error: 'No new post found!',
    });
  } else {
    const postData = doc.data();
    res.send(postData);
  }
});
