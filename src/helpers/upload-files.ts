import { ObjectId } from "mongodb";
import path from "path";

export const uploadFiles = (
  files: any,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitedName = file.name.split(".");
    const extension = splitedName[splitedName.length - 1];

    // Validar la extension
    if (!validExtensions.includes(extension)) {
      return reject(
        `La extensión ${extension} no es permitida - ${validExtensions}`
      );
    }
    const fileName = String(file).substring(
      0,
      file.length - extension.length + 1
    );
    const tempName = `${new ObjectId(fileName).toString()}.${extension}`;
    const uploadPath = path.join(__dirname, "../../uploads/", folder, tempName);

    file.mv(uploadPath, (err: any) => {
      if (err) {
        reject(err);
      }

      resolve(tempName);
    });
  });
};
