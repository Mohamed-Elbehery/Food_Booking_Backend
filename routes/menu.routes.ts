import { menuControllers } from "./../controllers/menu.controllers";
import express from "express";
export const menuRouter = express.Router();

/**
 * @openapi
 * /menu/get-menu:
 *  get:
 *    tags:
 *      - Menu
 *    summary: Get all menu items
 *    description: Retrieve a list of all items in the menu
 *    responses:
 *      200:
 *        description: List of menu items
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/MenuItem'
 */
menuRouter.get("/get-menu", menuControllers.getMenuItems);

/**
 * @openapi
 * /menu/get-menu-item:
 *  get:
 *    tags:
 *      - Menu
 *    summary: Get menu item by ID
 *    description: Retrieve a specific menu item by its ID
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the menu item
 *    responses:
 *      200:
 *        description: A single menu item
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MenuItem'
 *      404:
 *        description: Menu item not found
 */
menuRouter.get("/get-menu-item", menuControllers.getMenuItemByID);

/**
 * @openapi
 * /menu/add-menu-item:
 *  post:
 *    tags:
 *      - Menu
 *    summary: Add a new menu item
 *    description: Add a new item to the menu. Requires admin authentication.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MenuItemInput'
 *    responses:
 *      201:
 *        description: Menu item added successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MenuItem'
 *      400:
 *        description: Bad request
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 */
menuRouter.post("/add-menu-item", menuControllers.addMenuItem);

/**
 * @openapi
 * /menu/update-menu-item:
 *  patch:
 *    tags:
 *      - Menu
 *    summary: Update a menu item
 *    description: Update an existing menu item. Requires admin authentication.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the menu item to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/MenuItemInput'
 *    responses:
 *      200:
 *        description: Menu item updated successfully
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
 *      404:
 *        description: Menu item not found
 */
menuRouter.patch("/update-menu-item", menuControllers.updateMenuItem);

/**
 * @openapi
 * /menu/delete-menu-item:
 *  delete:
 *    tags:
 *      - Menu
 *    summary: Delete a menu item
 *    description: Delete a menu item by its ID. Requires admin authentication.
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the menu item to delete
 *    responses:
 *      200:
 *        description: Menu item deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                acknowledged:
 *                  type: boolean
 *                deletedCount:
 *                  type: number
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: Menu item not found
 */
menuRouter.delete("/delete-menu-item", menuControllers.deleteMenuItem);

/**
 * @openapi
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         item_photo:
 *           type: string
 *         price:
 *           type: number
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *           enum: [Breakfast, "Main Dishes", Drinks, Desserts]
 *     MenuItemInput:
 *       type: object
 *       required:
 *         - item_photo
 *         - price
 *         - title
 *         - ingredients
 *         - category
 *       properties:
 *         item_photo:
 *           type: string
 *         price:
 *           type: number
 *         title:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *           enum: [Breakfast, "Main Dishes", Drinks, Desserts]
 */
