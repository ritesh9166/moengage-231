/*
import { Router } from "express";
import {
  createList,
  deleteList,
  getList,
  updateList,
} from "../controller/list.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createList).get(getList);

router
  .route("/:listId")
  .patch(updateList)
  .delete(deleteList);

export default router;
*/

import { Router } from "express";
import multer from "multer";
import {
  createList,
  deleteList,
  getList,
  updateList,
} from "../controller/list.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.use(verifyJWT);

router.route("/")
  .post(upload.single('image'), createList)
  .get(getList);

router.route("/:listId")
  .patch(upload.single('image'), updateList)
  .delete(deleteList);

export default router;
