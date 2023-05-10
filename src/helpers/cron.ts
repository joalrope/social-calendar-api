import cron from "node-cron";

import { ISocialNetwork, SNPost, SocialNetwork } from "../models";
import { ISNPost } from "../models/sn-post";
import { facebookPosts, instagramPosts, tiktokPosts } from "./publishers";
import {} from "./publishers/facebook";

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
    .schedule("*/4 * * * * *", async () => {
      const query = {
        isActive: true,
        isPostMade: false,
        postDate: {
          $lte: new Date(),
        },
      };

      console.log(`====================${new Date()}================`);

      const posts: ISNPost[] = await SNPost.find(query, fields);

      posts.map(async (post) => {
        const { name }: ISocialNetwork = await SocialNetwork.findById(
          post.socialNetwork
        );

        const socialNetwork = socialNetworks[name];

        socialNetwork(post);
      });
    })
    .start();
};

const socialNetworks: any = {
  Instagram: instagramPosts,
  Facebook: facebookPosts,
  Tiktok: tiktokPosts,
};
