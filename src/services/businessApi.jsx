import axios from "axios";

// Fetch businesses from the server
export const fetchBusinesses = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/superadmin/businesses",
      {
        withCredentials: true,
      }
    );
    return response.data.businesses; // Return the list of businesses
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const AddBusinesses = async (businessData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/superadmin/onboard-business",
      businessData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return {
      success: true,
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const updateBusinessStatus = async (businessId, status) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/superadmin/businesses/${businessId}/status`,
      { status },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const generateLink = async (businessId) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/superadmin/generate-link",
      { businessId },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      status: response.status,
      message: response.data.message,
      link: response.data.link,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const validateToken = async (token) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/client/validate-token`,
      { token },
      {
        withCredentials: true,
      }
    );

    return {
      success: true,
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/dashboard", {
      withCredentials: true, // Include cookies in the request
    });
    return {
      success: true,
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};
