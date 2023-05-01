import cron from "node-cron";
import { SNPost } from "../models";

interface IPost {
  socialNetwork: string;
  postDate: Date;
  message: string;
  visualResources: string[];
  userId: string;
}

const fields = {
  _id: 0,
  socialNetwork: 1,
  postDate: 1,
  message: 1,
  visualResources: 1,
  userId: 1,
};

export const schedule = () => {
  cron
    .schedule("0 */1 * * * *", async () => {
      const query = {
        isActive: true,
        isPostMade: false,
        postDate: {
          $lte: new Date(),
        },
      };

      const posts: IPost[] = await SNPost.find(query, fields)
        .populate("socialNetwork", "name")
        .populate("userId", "name");

      posts.map((post) => {
        console.log(post);
      });
    })
    .start();
};
