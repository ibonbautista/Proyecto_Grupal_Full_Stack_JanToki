import {Router} from "express";
import restaurantController from "../controllers/restaurantController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",restaurantController.getRestaurants);
router.get("/:id",restaurantController.getRestaurantById);
router.post("/", isLoggedInAPI, isAdmin, restaurantController.createRestaurant);
router.put("/:id",restaurantController.updateRestaurant);
router.delete("/:id", isLoggedInAPI, isAdmin, restaurantController.deleteRestaurant);

export default router