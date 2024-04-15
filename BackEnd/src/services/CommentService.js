const Review = require("../models/commentModel");

const createReview = (newReview) => {
  return new Promise(async (resolve, reject) => {
    const { content, star, product, user, description } = newReview;
    try {
      const newReview = await Review.create({
        content,
        star,
        product,
        user,
        description
      });
      if (newReview) {
        resolve({
          status: 200,
          message: "Review success",
          typeError: "",
          data: newReview,
          statusMessage: "Success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateReview = (id, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkReview = await Review.findOne({
          _id: id,
        });
        if (checkReview === null) {
          resolve({
            status: 404, 
            message: "The review is not existed",
            typeError: "NOT_FOUND", 
            data: null,
            statusMessage: "Error",
          });
        }
  
        const updatedReview = await Review.findByIdAndUpdate(id, data, {
          new: true,
        });
        resolve({
          status: 200, 
          message: "Updated review success",
          typeError: "",
          data: updatedReview,
          statusMessage: "Success",
        });
      } catch (e) {
        reject({
          status: 500, 
          message: "Internal Server Error",
          typeError: "INTERNAL_ERROR", 
          data: null,
          statusMessage: "Error",
        });
      }
    });
  };

const deleteReview = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkReview = await Review.findOne({
        _id: id,
      });
      if (checkReview === null) {
        resolve({
          status: 404,
          message: "The review is not existed",
          error: {
            type: "NOT_FOUND",
            details: "The requested review was not found.",
          },
          data: null,
          statusMessage: "Error",
        });
      }

      await Review.findByIdAndDelete(id);
      resolve({
        status: 200,
        message: "Deleted review success",
        error: null,
        data: checkReview,
        statusMessage: "Success",
      });
    } catch (e) {
      reject({
        status: 500,
        message: "Internal Server Error",
        error: {
          type: "INTERNAL_ERROR",
          details: "An internal server error occurred.",
        },
        data: null,
        statusMessage: "Error",
      });
    }
  });
};

const deleteManyReview = (ids) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Review.deleteMany({ _id: ids });
        resolve({
          status: 200,
          message: "Delete reviews success",
          typeError: null,
          data: null,
          statusMessage: "Success",
        });
      } catch (e) {
        reject({
          status: 500,
          message: "Internal Server Error",
          typeError: "INTERNAL_ERROR",
          data: null,
          statusMessage: "Error",
        });
      }
    });
  };

  const getDetailsReview = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checkReview = await Review.findOne({
          _id: id,
        });
        if (checkReview === null) {
          resolve({
            status: 404, 
            message: "The review is not existed",
            typeError: "NOT_FOUND", 
            data: null,
            statusMessage: "Error",
          });
        }
        resolve({
          status: 200, 
          message: "Success",
          typeError: "",
          data: checkReview,
          statusMessage: "Success",
        });
      } catch (e) {
        reject({
          status: 500, 
          message: "Internal Server Error",
          typeError: "INTERNAL_ERROR", 
          data: null,
          statusMessage: "Error",
        });
      }
    });
  };

  const getAllReview = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const limit = params?.limit ?? 10;
        const search = params?.search ?? "";
        const page = params?.page ?? 1;
        const order = params?.order ?? "";
        const user = params.user ?? "";
        const product = params.product ?? "";
        const description = params.product ?? "";

        const buildQuery = (search) => {
          const query = {};
          if (search) {
            const searchRegex = { $regex: search, $options: "i" };
            query.$or = [{ email: searchRegex }];
          }
          return query;
        };
        const query = buildQuery(search);
  

  
        if (user) {
          if (Array.isArray(user)) {
            query.user = { $in: user };
          } else {
            query.user = user;
          }
        }
  
        if (product) {
          if (Array.isArray(product)) {
            query.product = { $in: product };
          } else {
            query.product = product;
          }
        }

        if(description) {
          if(Array.isArray(description)) {
            query.description = {$in: description};
          } else {
            query.description = description;
          }
        }
  
        if (search) {
          const searchRegex = { $regex: search, $options: "i" };
  
          query.$or = [{ email: searchRegex }];
        }
  
        const totalCount = await Review.countDocuments(query);
  
        const totalPage = Math.ceil(totalCount / limit);
  
        const fieldsToSelect = {
          content: 1,
          name: 1,
          star:1,
          user: 1,
          product: 1,
          description,
          createdAt: 1,
          updatedAt: 1,
        };

        const allReview = await Review.find(query)
          .select(fieldsToSelect)
          .populate({
            path: 'user',
            select: 'name avatar email', 
          })
          .populate({
            path: 'product',
            select: 'name  description', 
          });
        resolve({
          status: 200, 
          message: "Success",
          typeError: "",
          statusMessage: "Success",
          data: {
            reviews: allReview,
            totalPage: totalPage,
            totalCount: totalCount,
          },
        });
      } catch (e) {
        console.log('e', e);
        reject({
          status: 500,
          message: "Internal Server Error",
          typeError: "INTERNAL_ERROR", 
          statusMessage: "Error",
          data: null,
        });
      }
    });
  };

module.exports = {
  createReview,
  updateReview,
  getDetailsReview,
  deleteReview,
  getAllReview,
  deleteManyReview,
};