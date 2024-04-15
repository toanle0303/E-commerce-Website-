const ReviewService = require("../services/CommentService");

const createReview = async (req, res) => {
    try {
      const { content, star, user, product } = req.body;
  
      if (!content || !user || !product) {
        const requiredFields = ["content", "star", "user", "product"];
        return res.status(400).json({
          status: "Error",
          typeError: "INVALID",
          message: `The field ${requiredFields.join(", ")} is required`,
          data: null,
        });
      }
      const response = await ReviewService.createReview(req.body);
      const { data, status, typeError, message, statusMessage } = response;
      return res.status(status).json({
        typeError,
        data,
        message,
        status: statusMessage,
      });
    } catch (e) {
      console.log('e', e)
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        status: "Error",
        typeError: "INTERNAL_ERROR",
      });
    }
  };

const updateReview = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "Error",
        typeError: "INVALID",
        message: "The field productId is required",
      });
    }
    const response = await ReviewService.updateReview(productId, req.body);
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: "INTERNAL_ERROR",
    });
  }
};

const getDetailsReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
      if (!reviewId) {
        return res.status(400).json({
          status: "Error",
          typeError: "INVALID",
          message: "The field reviewId is required",
          data: null,
        });
      }
      const response = await ReviewService.getDetailsReview(reviewId);
      const { data, status, typeError, message, statusMessage } = response;
      return res.status(status).json({
        typeError,
        data,
        message,
        status: statusMessage,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        status: "Error",
        typeError: "INTERNAL_ERROR",
      });
    }
  };

  const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
      if (!reviewId) {
        return res.status(400).json({
          status: "Error",
          typeError: "INVALID",
          message: "The field reviewId is required",
          data: null,
        });
      }
      const response = await ReviewService.deleteReview(reviewId);
      const { data, status, typeError, message, statusMessage } = response;
      return res.status(status).json({
        typeError,
        data,
        message,
        status: statusMessage,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        status: "Error",
        typeError: "INTERNAL_ERROR",
      });
    }
  };

const deleteMany = async (req, res) => {
  try {
    const ids = req.query.reviewIds;
    if (!ids || !ids.length) {
      return res.status(400).json({
        status: "Error",
        typeError: "INVALID",
        message: "The field reviewIds is required",
        data: null,
      });
    }
    const response = await ReviewService.deleteManyReview(ids);
    const { data, status, typeError, message, statusMessage } = response;
    return res.status(status).json({
      typeError,
      data,
      message,
      status: statusMessage,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      status: "Error",
      typeError: "INTERNAL_ERROR",
    });
  }
};

const getAllReview = async (req, res) => {
    try {
      const params = req.query;
      const response = await ReviewService.getAllReview(params);
      const { data, status, typeError, message, statusMessage } = response;
      return res.status(status).json({
        typeError,
        data,
        message,
        status: statusMessage,
      });
    } catch (e) {
      console.log('e', e);
      return res.status(500).json({
        message: "Internal Server Error",
        data: null,
        status: "Error",
        typeError: "INTERNAL_ERROR",
      });
    }
  };
module.exports = {
  createReview,
  updateReview,
  getDetailsReview,
  deleteReview,
  getAllReview,
  deleteMany,
};