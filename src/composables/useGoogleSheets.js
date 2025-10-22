import { ref } from "vue";

// Google Sheets API configuration
const SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID,
  range: "Sheet1!A:M", // Adjust range based on your columns
};

export function useGoogleSheets() {
  const isLoading = ref(false);
  const error = ref(null);

  // Auto-detect browser and OS information
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const browserInfo = {
      browser: "Unknown",
      browserVersion: "Unknown",
      os: "Unknown",
      screenResolution: `${screen.width}x${screen.height}`,
      userAgent: userAgent,
    };

    // Detect browser
    if (userAgent.includes("Chrome")) {
      browserInfo.browser = "Chrome";
      const match = userAgent.match(/Chrome\/(\d+)/);
      if (match) browserInfo.browserVersion = match[1];
    } else if (userAgent.includes("Firefox")) {
      browserInfo.browser = "Firefox";
      const match = userAgent.match(/Firefox\/(\d+)/);
      if (match) browserInfo.browserVersion = match[1];
    } else if (userAgent.includes("Safari")) {
      browserInfo.browser = "Safari";
      const match = userAgent.match(/Version\/(\d+)/);
      if (match) browserInfo.browserVersion = match[1];
    } else if (userAgent.includes("Edge")) {
      browserInfo.browser = "Edge";
      const match = userAgent.match(/Edge\/(\d+)/);
      if (match) browserInfo.browserVersion = match[1];
    }

    // Detect OS
    if (userAgent.includes("Windows")) {
      browserInfo.os = "Windows";
    } else if (userAgent.includes("Mac")) {
      browserInfo.os = "macOS";
    } else if (userAgent.includes("Linux")) {
      browserInfo.os = "Linux";
    } else if (userAgent.includes("Android")) {
      browserInfo.os = "Android";
    } else if (userAgent.includes("iOS")) {
      browserInfo.os = "iOS";
    }

    return browserInfo;
  };

  // Submit bug report to Google Sheets
  const submitBugReport = async (formData) => {
    isLoading.value = true;
    error.value = null;

    try {
      const browserInfo = getBrowserInfo();
      const timestamp = new Date().toLocaleString("el-GR");

      // Prepare data for Google Sheets
      const rowData = [
        timestamp,
        formData.type || "",
        formData.priority || "",
        formData.title || "",
        formData.description || "",
        formData.steps || "",
        formData.expectedBehavior || "",
        formData.actualBehavior || "",
        browserInfo.browser,
        browserInfo.os,
        browserInfo.browserVersion,
        formData.contactEmail || "",
        "New", // Status
      ];

      // Use Google Sheets API to append data
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${SHEETS_CONFIG.range}:append?valueInputOption=RAW&key=${SHEETS_CONFIG.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: [rowData],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Google Sheets API Error:", errorData);
        
        // Provide more specific error messages
        if (response.status === 403) {
          throw new Error("Access denied. Please check API key permissions and spreadsheet sharing settings.");
        } else if (response.status === 404) {
          throw new Error("Spreadsheet not found. Please check the spreadsheet ID.");
        } else {
          throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }
      }

      return {
        success: true,
        message: "Bug report submitted successfully!",
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message,
      };
    } finally {
      isLoading.value = false;
    }
  };

  // Test connection to Google Sheets
  const testConnection = async () => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}?key=${SHEETS_CONFIG.apiKey}`
      );

      if (response.ok) {
        return { success: true, message: "Connection successful" };
      } else {
        const errorData = await response.json();
        console.error("Connection test error:", errorData);
        
        if (response.status === 403) {
          return { 
            success: false, 
            message: "Access denied. Check API key permissions and spreadsheet sharing." 
          };
        } else if (response.status === 404) {
          return { 
            success: false, 
            message: "Spreadsheet not found. Check the spreadsheet ID." 
          };
        } else {
          return { 
            success: false, 
            message: `Connection failed: ${errorData.error?.message || response.status}` 
          };
        }
      }
    } catch (err) {
      return { success: false, message: `Connection error: ${err.message}` };
    }
  };

  return {
    isLoading,
    error,
    submitBugReport,
    testConnection,
    getBrowserInfo,
  };
}
