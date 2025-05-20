import {Router} from "express";
import restaurantController from "../controllers/restaurantController.js";

const router = Router();

router.get("/",restaurantController.getRestaurants);
router.get("/:id",restaurantController.getRestaurantById);
router.post("/",restaurantController.createRestaurant);
router.put("/:id",restaurantController.updateRestaurant);
router.delete("/:id",restaurantController.deleteRestaurant);

export default router