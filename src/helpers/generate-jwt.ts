import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, email: string, role: string) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, email, role };

    jwt.sign(
      payload,
      String(process.env.SECRET_KEY),
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
