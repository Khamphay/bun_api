import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { client } from "../config/db";
import { TokenModel } from "./TokenModel";

const exp = "1d";

export default {
  userSignIn: async (c, next) => {
    try {
      const body = c.req.parseBody();
      const { userName, password } = body;
      let user = await client.users.findUnique({
        include: { roles: true },
        where: { userName: userName }
      });

      if (!user) {
        c.status(400);
        return c.json({ msg: "Not found User or username invalid!" });
      }

      var isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return c.status(400).jsonp({ msg: "Password Invalid!" });
      }
      const payload: TokenModel = {
        user: {
          uid: user.uid,
          userName: user.userName,
          roleId: user.roleId
        }
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: exp
      });
      c.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });

      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, {
        expiresIn: "3d"
      });

      c.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      });

      await client.users.update({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          expired: exp
        },
        where: {
          uid: user.uid
        }
      });

      return c.json({
        mag: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ",
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      next(error);
    }
  },

  refreshSignInToken: async (c, next) => {
    try {
      const refreshToken = c.req.cookies["refreshToken"];
      console.log(refreshToken);
      if (refreshToken == null) {
        return c.status(403).json({ msg: "Refresh Token is required!" });
      }

      const decode = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET!
      ) as TokenModel;

      if (decode) {
        const payload: TokenModel = {
          user: {
            uid: decode.user.uid,
            userName: decode.user.userName,
            roleId: decode.user.roleId
          }
        };
        const newToken = jwt.sign(payload, process.env.JWT_SECRET!, {
          expiresIn: exp
        });

        c.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });

        await client.users.update({
          data: {
            accessToken: newToken,
            expired: exp
          },
          where: {
            uid: payload.user.uid
          }
        });

        return c.json({
          mag: "Refresh token successfully",
          accessToken: newToken
        });
      } else {
        return c.status(403).json({ msg: "Unauthorized access!" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
