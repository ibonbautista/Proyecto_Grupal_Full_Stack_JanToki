import {Router} from "express";
import restaurantController from "../controllers/restaurantController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { uploadRestaurant } from "../middlewares/multer.js";

const router = Router();

router.get("/",restaurantController.getRestaurants);
router.get("/:id",restaurantController.getRestaurantById);
router.post("/", isLoggedInAPI, isAdmin, uploadRestaurant.single('image'),restaurantController.createRestaurant);
router.put("/:id",isLoggedInAPI, isAdmin, uploadRestaurant.single('image'),restaurantController.updateRestaurant);
router.delete("/:id", isLoggedInAPI, isAdmin, restaurantController.deleteRestaurant);

export default router