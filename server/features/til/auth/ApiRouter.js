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
 *              delay:
 *                type: integer
 *                example: 500
 *              expiredTime:
 *                type: string
 *                example: 5m
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
  var timeDelay = req.body.delay ? req.body.delay : 0;
  var expiredTime = req.body.expiredTime ? req.body.expiredTime : "5m";
  // 만료 1분
  var refreshToken = jwt.sign(
    {
      type: "JWT",
      nickname: email,
    },
    jwtSecret,
    {
      expiresIn: expiredTime,
      issuer: "sieun ju",
      algorithm: "HS256",
    }
  );
  setTimeout(function () {
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
  }, timeDelay);
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

/**
 * @swagger
 *
 * /api/til/auth/jwt/test:
 *  get:
 *    summary: "JWT Token 에 대서 테스트 API 입니다."
 *    tags: [TIL, TIL_AUTH]
 *    parameters:
 *      - in: query
 *        name: timeDelay
 *        description: 임의 딜레이 시간
 *        schema:
 *          type: int
 *          example: 0
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: object
 *                  properties:
 *                    payload:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: JWT Token Test
 *
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: error Message
 */
router.get("/jwt/test", (req, res) => {
  var token = req.headers.authorization;
  let decoded = null;
  try {
    let timeDelay =
      req.query.timeDelay !== null && req.query.timeDelay !== undefined
        ? req.query.timeDelay
        : 0;
    decoded = jwt.verify(token, jwtSecret);
    setTimeout(function () {
      res
        .status(200)
        .send({
          status: true,
          data: {
            payload: {
              message: "JWT Token Test",
            },
          },
        })
        .end();
    }, timeDelay);
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

/**
 * @swagger
 *
 * /api/til/auth/jwt/test1:
 *  get:
 *    summary: "JWT Token 에 대서 테스트 API 입니다. 1"
 *    tags: [TIL, TIL_AUTH]
 *    parameters:
 *      - in: query
 *        name: timeDelay
 *        description: 임의 딜레이 시간
 *        schema:
 *          type: int
 *          example: 0
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: object
 *                  properties:
 *                    payload:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: JWT Token Test
 *
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: error Message
 */
router.get("/jwt/test1", (req, res) => {
  var token = req.headers.authorization;
  let decoded = null;
  try {
    let timeDelay =
      req.query.timeDelay !== null && req.query.timeDelay !== undefined
        ? req.query.timeDelay
        : 0;
    decoded = jwt.verify(token, jwtSecret);
    setTimeout(function () {
      res
        .status(200)
        .send({
          status: true,
          data: {
            payload: {
              message: "JWT Token Test1",
            },
          },
        })
        .end();
    }, timeDelay);
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

/**
 * @swagger
 *
 * /api/til/auth/jwt/test2:
 *  get:
 *    summary: "JWT Token 에 대서 테스트 API 입니다. 2"
 *    tags: [TIL, TIL_AUTH]
 *    parameters:
 *      - in: query
 *        name: timeDelay
 *        description: 임의 딜레이 시간
 *        schema:
 *          type: int
 *          example: 0
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                data:
 *                  type: object
 *                  properties:
 *                    payload:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: JWT Token Test
 *
 *      401:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  example: error Message
 */
router.get("/jwt/test2", (req, res) => {
  var token = req.headers.authorization;
  let decoded = null;
  try {
    let timeDelay =
      req.query.timeDelay !== null && req.query.timeDelay !== undefined
        ? req.query.timeDelay
        : 0;
    decoded = jwt.verify(token, jwtSecret);
    setTimeout(function () {
      res
        .status(200)
        .send({
          status: true,
          data: {
            payload: {
              message: "JWT Token Test2",
            },
          },
        })
        .end();
    }, timeDelay);
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
