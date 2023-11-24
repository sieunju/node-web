/**
 * 사용자 인증 라우터
 */
const express = require("express");
const router = express.Router();
const utils = require("../../../utils/commandUtil");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * @swagger
 *
 * /api/til/auth/refresh:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "Auth Token 갱신"
 *    tags: [TIL, TIL_AUTH]
 *
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: test@naver.com
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                      example: JWT Token Example...
 */
router.post("/refresh", (req, res) => {
  // Refresh Token..
  // var token = req.header("Authorization");
  var email = req.body.email;
  // 만료 1분
  var refreshToken = jwt.sign(
    {
      type: "JWT",
      nickname: email,
    },
    jwtSecret,
    {
      expiresIn: "5m",
      issuer: "sieun ju",
      algorithm: "HS256",
    }
  );
  res
    .status(200)
    .send({
      status: true,
      data: {
        payload: {
          token: refreshToken,
        },
      },
    })
    .end();
});

/**
 * @swagger
 *
 * /api/til/auth/expired:
 *  post:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "만료되는 토큰 발급 받기 입니다."
 *    tags: [TIL, TIL_AUTH]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  token:
 *                                      type: string
 *                                      example: Token Expired 112123123123
 */
router.post("/expired", (req, res) => {
  var expiredToken = "Token Expired " + new Date().getTime();
  console.log("Expired Token " + expiredToken);
  res
    .status(200)
    .send({
      status: true,
      data: {
        payload: {
          token: expiredToken,
        },
      },
    })
    .end();
});

/**
 * @swagger
 *
 * /api/til/auth/test:
 *  get:
 *    summary: "TIL 전용 API 테스트 입니다."
 *    description: "만료되는 토큰 발급 받기 입니다."
 *    tags: [TIL, TIL_AUTH]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  status:
 *                      type: boolean
 *                      example: true
 *                  data:
 *                      type: object
 *                      properties:
 *                          payload:
 *                              type: object
 *                              properties:
 *                                  integer:
 *                                      type: date-time
 *                                      example: 112123123123
 *                                  str:
 *                                      type: string
 *                                      example: 그대와 처음 만난 이곳 모든날 모든 순간 좋았다.
 */
router.get("/test", (req, res) => {
  res
    .status(200)
    .send({
      status: true,
      data: {
        payload: {
          integer: new Date().getTime(),
          str: utils.randomMessage(),
        },
      },
    })
    .end();
});

/**
 * @swagger
 *
 * /api/til/auth/validate:
 *  get:
 *      summary: "JWT Token 유효성 체크하는 API 입니다."
 *      description: "만료되는 토큰 발급 받기 입니다."
 *      tags: [TIL, TIL_AUTH]
 *      parameters:
 *        - in: header
 *          name: authorization
 *          required: true
 *          description: 테스트로 뭔가 잘 안된다...모르겠다.swaggerDefinition 여기서 뭐 설정하라는데 안됨..
 *          schema:
 *              type: string
 *              example: JWT Token
 *
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *          401:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: error Message
 */
router.get("/validate", (req, res) => {
  var token = req.headers.authorization;
  let decoded = null;
  try {
    decoded = jwt.verify(token, jwtSecret);
    res.status(200).send().end();
  } catch (err) {
    res
      .status(401)
      .send({
        status: false,
        message: err,
      })
      .end();
  }
});

module.exports = router;
