import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Storage } from "../firebase/firebase.config";

function uploadFile(req: any) {
  return new Promise((resolve, reject) => {
    const bucket = Storage.bucket(process.env.BUCKET_URL);
    const fileName = Date.now() + path.extname(req.files.file.name);
    const upload = bucket.file(fileName);
    fs.createReadStream(req.files.file.tempFilePath)
      .pipe(
        upload.createWriteStream({
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuidv4(),
            },
          },
          public: true,
          validation: "md5",
        })
      )
      .on("error", function (err: any) {
        reject();
      })
      .on("finish", async () => {
        upload.get().then(
          (res: any) => {
            const downloadUrl =
              "https://firebasestorage.googleapis.com/v0/b/cookbook-staging-1cc4b.appspot.com/o/" +
              res[0].metadata.name.replace(/\//g, "%2F") +
              "?alt=media&token=" +
              res[0].metadata.metadata.firebaseStorageDownloadTokens;

            fs.unlinkSync(req.files.file.tempFilePath);
            resolve(downloadUrl);
          },
          (err) => reject(err)
        );
      });
  });
}

export default {
  uploadFile,
};
