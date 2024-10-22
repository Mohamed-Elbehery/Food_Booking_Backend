import { authControllers } from "./../controllers/auth.controllers";
import express from "express";
export const authRouter = express.Router();

/**
 * @openapi
 * /auth/get-all-users:
 *  get:
 *    tags:
 *      - Auth
 *    summary: Get all users
 *    description: Retrieve a list of all users. Requires authentication.
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
authRouter.get("/get-all-users", authControllers.getAllUsers);

/**
 * @openapi
 * /auth/get-user:
 *  get:
 *    tags:
 *      - Auth
 *    summary: Get user by ID
 *    description: Retrieve a user by their ID. Requires authentication.
 *    security:
 *      - bearerAuth: []
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
 *              $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
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
 *    summary: Register a new user
 *    description: Create a new user account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - profile_img
 *              - phone_number
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              profile_img:
 *                type: string
 *                format: binary
 *              phone_number:
 *                type: string
 *    responses:
 *      201:
 *        description: User registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/User'
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
 *    summary: Register a new admin
 *    description: Create a new admin account. Requires authentication with admin privileges.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - profile_img
 *              - phone_number
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              profile_img:
 *                type: string
 *                format: binary
 *              phone_number:
 *                type: string
 *    responses:
 *      201:
 *        description: Admin registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/User'
 *                token:
 *                  type: string
 *      400:
 *        description: Bad request
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
authRouter.post("/admin-register", authControllers.adminRegister);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Log in a user
 *    description: Authenticate a user and return a token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *      200:
 *        description: User logged in successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/User'
 *                token:
 *                  type: string
 *      400:
 *        description: Bad request
 *      401:
 *        description: Incorrect email or password
 */
authRouter.post("/login", authControllers.login);

/**
 * @openapi
 * /auth/change-role:
 *  patch:
 *    tags:
 *      - Auth
 *    summary: Change a user's role
 *    description: Change the role of a user. Requires authentication with admin privileges.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: _id
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the user whose role is to be changed
 *      - name: role
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *          enum: [normal, admin]
 *        description: The new role for the user
 *    responses:
 *      200:
 *        description: User role updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                acknowledged:
 *                  type: boolean
 *                modifiedCount:
 *                  type: number
 *                upsertedId:
 *                  type: string
 *                upsertedCount:
 *                  type: number
 *                matchedCount:
 *                  type: number
 *      400:
 *        description: Bad request
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
authRouter.patch("/change-role", authControllers.changeRole);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         bookings:
 *           type: string
 *           description: ID of associated booking
 *         profile_img:
 *           type: string
 *         phone_number:
 *           type: string
 *         role:
 *           type: string
 *           enum: [normal, admin]
 *           default: normal
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
