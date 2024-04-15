import { axiosJWT } from "./UserService";

export const createComment = async (data) => {
  try {
    const { userId, idProduct, content, access_token } = data; // Extract userId and productId
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/comments`, {  user: userId, content, product: idProduct }, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (id, data, access_token) => {
  try {
    const { userId, productId, ...commentData } = data; 
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/comments/${id}`, { data }, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const commentList = async (data, access_token) => {
  try {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/comments`, {data}, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
  
    console.error("Error updating comment:", error);
    throw error;
  }
}

export const deleteManyComments = async (reviewIds, userId, productId, access_token) => {
  try {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/comments/delete-many`, {
      params: { reviewIds, userId, productId },
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting many comments:", error);
    throw error;
  }
};

