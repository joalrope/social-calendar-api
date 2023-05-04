import cron from "node-cron";
import { TwitterApi } from "twitter-api-v2";
import { config } from "dotenv";
import path from "path";

import { User, rrssUser, SNPost } from "../models";
import { ISNPost } from "../models/sn-post";

config();

const fields = {
  _id: 0,
  socialNetwork: 1,
  postDate: 1,
  message: 1,
  visualResources: 1,
  userId: 1,
};

/* interface ISN {
  id: string;
  name: string;
} */

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

      const posts: ISNPost[] = await SNPost.find(query, fields);

      posts.map(async (post) => {
        const { socialNetworks } = await User.findById(post.userId);
        socialNetworks.map(async (socialNetwork: rrssUser) => {
          const postRRSS = post.socialNetwork.toString();
          const userRRSS = socialNetwork.snId.toString();

          if (postRRSS === userRRSS) {
            const { snId, credential } = socialNetwork;

            const twitterClient = new TwitterApi({
              clientId: String(process.env.CLIENT_ID),
              clientSecret: String(process.env.CLIENT_SECRET),
            });

            const uploadPath = path.join(
              __dirname,
              `../../uploads/images/${"644b3b06a8ab682498d89de0"}/${"644f20e167fbc03f90eadc86.png"}`
            );

            console.log(
              "=====================********==========================="
            );
            // First, post all your images to Twitter
            const mediaIds = await Promise.all([
              // file path
              twitterClient.v1.uploadMedia(uploadPath),
            ]);

            // mediaIds is a string[], can be given to .tweet
            await twitterClient.v1.tweet("My tweet text with one image!", {
              media_ids: mediaIds,
            });

            console.log({
              snId,
              credential,
              msg: post.message,
              picture: post.visualResources,
            });
          }
        });
      });
    })
    .start();
};
