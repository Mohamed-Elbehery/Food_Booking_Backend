import { menuControllers } from "./../controllers/menu.controllers";
import express from "express";
export const menuRouter = express.Router();

/**
 * @openapi
 * /menu/get-menu:
 *  get:
 *    tags:
 *      - Menu
 *    description: Will return a json of the items we serve in the menu
 *    responses:
 *      200:
 *        description: List of items we serve in the menu
 */
menuRouter.get("/get-menu", menuControllers.getMenuItems);

/**
 * @openapi
 * /menu/get-menu-item?_id=1234:
 *  get:
 *    tags:
 *      - Menu
 *    description: Will return a json of the item we serve in the menu by ID
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
 */
menuRouter.get("/get-menu-item", menuControllers.getMenuItemByID);

/**
 * @openapi
 * /menu/add-menu-item:
 *  post:
 *    tags:
 *      - Menu
 *    description: Adds a new menu item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              price:
 *                type: number
 *              description:
 *                type: string
 *    responses:
 *      201:
 *        description: Menu item added
 */
menuRouter.post("/add-menu-item", menuControllers.addMenuItem);

/**
 * @openapi
 * /menu/update-menu-item:
 *  patch:
 *    tags:
 *      - Menu
 *    description: Updates a menu item
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              price:
 *                type: number
 *              description:
 *                type: string
 *    responses:
 *      200:
 *        description: Menu item updated
 */
menuRouter.patch("/update-menu-item", menuControllers.updateMenuItem);

/**
 * @openapi
 * /menu/delete-menu-item?_id=1234:
 *  delete:
 *    tags:
 *      - Menu
 *    description: Deletes a menu item
 *    parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the menu item to delete
 *    responses:
 *      200:
 *        description: Menu item deleted
 */
menuRouter.delete("/delete-menu-item", menuControllers.deleteMenuItem);
