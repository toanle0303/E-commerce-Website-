const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/CommentController");

router.post("/", ReviewController.createReview);

router.put("/:id", ReviewController.updateReview);

router.get("/:id", ReviewController.getDetailsReview);

router.delete("/:id", ReviewController.deleteReview);

router.get("/", ReviewController.getAllReview);

router.delete("/delete-many", ReviewController.deleteMany);

module.exports = router;
