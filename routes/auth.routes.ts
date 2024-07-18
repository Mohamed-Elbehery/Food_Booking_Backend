import { authControllers } from "./../controllers/auth.controllers";
import express from "express";
export const authRouter = express.Router();

/**
 * @openapi
 * /auth/get-all-users:
 *  get:
 *    tags:
 *      - Auth
 *    description: Get all users
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  email:
 *                    type: string
 *                    format: email
 *                  name:
 *                    type: string
 *                  bookings:
 *                    type: string
 *                  profile_img:
 *                    type: string
 *                  phone_number:
 *                    type: string
 *                  role:
 *                    type: string
 *                    enum: ["normal", "admin"]
 *                    default: "normal"
 *      401:
 *        description: Unauthorized
 */
authRouter.get("/get-all-users", authControllers.getAllUsers);

/**
 * @openapi
 * /auth/get-user:
 *  get:
 *    tags:
 *      - Auth
 *    description: Get user by ID
 *    parameters:
 *      - name: _id
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: The user ID
 *    responses:
 *      200:
 *        description: The user data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                name:
 *                  type: string
 *                bookings:
 *                  type: string
 *                profile_img:
 *                  type: string
 *                phone_number:
 *                  type: string
 *                role:
 *                  type: string
 *                  enum: ["normal", "admin"]
 *                  default: "normal"
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: User not found
 */
authRouter.get("/get-user", authControllers.getUserById);

/**
 * @openapi
 * /auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    description: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *              profile_img:
 *                type: string
 *              phone_number:
 *                type: string
 *            required:
 *              - name
 *              - email
 *              - password
 *              - profile_img
 *              - phone_number
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    name:
 *                      type: string
 *                    bookings:
 *                      type: string
 *                    profile_img:
 *                      type: string
 *                    phone_number:
 *                      type: string
 *                    role:
 *                      type: string
 *                      enum: ["normal", "admin"]
 *                      default: "normal"
 *                token:
 *                  type: string
 *      400:
 *        description: Bad request
 */
authRouter.post("/register", authControllers.register);

/**
 * @openapi
 * /auth/admin-register:
 *  post:
 *    tags:
 *      - Auth
 *    description: Register a new admin
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *              profile_img:
 *                type: string
 *              phone_number:
 *                type: string
 *            required:
 *              - name
 *              - email
 *              - password
 *              - profile_img
 *              - phone_number
 *    responses:
 *      201:
 *        description: Admin registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    name:
 *                      type: string
 *                    bookings:
 *                      type: string
 *                    profile_img:
 *                      type: string
 *                    phone_number:
 *                      type: string
 *                    role:
 *                      type: string
 *                      enum: ["normal", "admin"]
 *                      default: "normal"
 *                token:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 */
authRouter.post("/admin-register", authControllers.adminRegister);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    description: Log in a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *    responses:
 *      200:
 *        description: User logged in successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    name:
 *                      type: string
 *                    bookings:
 *                      type: string
 *                    profile_img:
 *                      type: string
 *                    phone_number:
 *                      type: string
 *                    role:
 *                      type: string
 *                      enum: ["normal", "admin"]
 *                      default: "normal"
 *                token:
 *                  type: string
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 */
authRouter.post("/login", authControllers.login);

/**
 * @openapi
 * /auth/change-role:
 *  patch:
 *    tags:
 *      - Auth
 *    description: Change a user's role
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              role:
 *                type: string
 *                enum: ["normal", "admin"]
 *            required:
 *              - _id
 *              - role
 *    responses:
 *      200:
 *        description: User role updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 *                    name:
 *                      type: string
 *                    bookings:
 *                      type: string
 *                    profile_img:
 *                      type: string
 *                    phone_number:
 *                      type: string
 *                    role:
 *                      type: string
 *                      enum: ["normal", "admin"]
 *                      default: "normal"
 *                message:
 *                  type: string
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 */
authRouter.patch("/change-role", authControllers.changeRole);
