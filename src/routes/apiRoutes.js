const express = require("express");
const apiClient = require("../config/apiclient");

const router = express.Router();



router.post("/integration/issue_point", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone parameter is required.",
      });
    }

    // Make the API call with the body and query params
    const response = await apiClient.post(
      "integration/issue_point",
      req.body,
      {
        params: { phone },
      }
    );

    // Respond with the external API's data
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error while calling Eber API:", {
      message: error.message,
      ...(error.response ? { data: error.response.data } : {}),
    });

    // Handle API-specific errors
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        success: false,
        message: "Eber API error",
        errorDetails: data,
      });
    }

    // Handle generic server errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      errorDetails: error.message,
    });
  }
});

router.post("/integration/redeem", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { phone } = req.query;

    // if (!phone) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Phone parameter is required.",
    //   });
    // }

    // Make the API call with the body and query params
    const response = await apiClient.post(
      "integration/redeem",
      req.body,
      // {
      //   params: { phone },
      // }
    );

    // Respond with the external API's data
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error while calling Eber API:", {
      message: error.message,
      ...(error.response ? { data: error.response.data } : {}),
    });

    // Handle API-specific errors
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        success: false,
        message: "Eber API error",
        errorDetails: data,
      });
    }

    // Handle generic server errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      errorDetails: error.message,
    });
  }
});


// Route to handle requests
router.get("/integration/user/show", async (req, res) => {
  console.log(req.query,'req')
  try {
    const { phone,list_redeemable } = req.query;
    const response = await apiClient.get("/integration/user/show", {
      params: { phone,list_redeemable},
    });
    console.log(response,'respoi')
    res.json(response.data);
  } 
  catch (error) {
    console.error("Error while calling Eber API:", error.message);

    // Check if the error has a response (indicating it's from the Eber API)
    if (error.response) {
      const { status, data } = error.response;

      // Respond with the Eber API error status and message, but avoid server crash
      res.status(200).json({
        success: false,
        message: "Eber API error",
        statusCode: status,
        errorDetails: data,
      });

    } else {
      // Handle other types of errors (e.g., network issues)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorDetails: error.message,
      });
    }
  }
});

router.get("/business/list/user", async (req, res) => {
  console.log(req.query, "req");

  try {
    const { page, limit, display_name } = req.query;

    const response = await apiClient.get("/business/list/user", {
      params: { page, limit, display_name },
    });

    res.json(response.data);

  } 
  catch (error) {
    console.error("Error while calling Eber API:", error.message);

    // Check if the error has a response (indicating it's from the Eber API)
    if (error.response) {
      const { status, data } = error.response;

      // Respond with the Eber API error status and message, but avoid server crash
      res.status(200).json({
        success: false,
        message: "Eber API error",
        statusCode: status,
        errorDetails: data,
      });

    } else {
      // Handle other types of errors (e.g., network issues)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorDetails: error.message,
      });
    }
  }
});


router.post("/integration/point_transaction/void", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Query parameters:", req.query);

    const { transaction_id } = req.query;

    // Validate required query parameter
    if (!transaction_id) {
      return res.status(400).json({
        success: false,
        message: "transaction_id query parameter is required.",
      });
    }

    // Make the API call with query params and request body if needed
    const response = await apiClient.post(
      "/integration/point_transaction/void",
      req.body, // Request body passed here
      {
        params: { transaction_id }, // Query parameters
      }
    );

    // Respond with the external API's response
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error while calling external API:", {
      message: error.message,
      ...(error.response ? { data: error.response.data } : {}),
    });

    // Handle API-specific errors
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json({
        success: false,
        message: "External API error",
        errorDetails: data,
      });
    }

    // Handle generic server errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      errorDetails: error.message,
    });
  }
});

router.get("/integration/point_transaction", async (req, res) => {
  console.log(req.query, "req");

  try {
    const { page, limit, display_name } = req.query;

    const response = await apiClient.get("/integration/point_transaction", {
      params: { page, limit, display_name },
    });

    res.json(response.data);

  } 
  catch (error) {
    console.error("Error while calling Eber API:", error.message);

    // Check if the error has a response (indicating it's from the Eber API)
    if (error.response) {
      const { status, data } = error.response;

      // Respond with the Eber API error status and message, but avoid server crash
      res.status(200).json({
        success: false,
        message: "Eber API error",
        statusCode: status,
        errorDetails: data,
      });

    } else {
      // Handle other types of errors (e.g., network issues)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        errorDetails: error.message,
      });
    }
  }
});


module.exports = router;
