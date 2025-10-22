# Bug Report System Setup Guide

## 📊 Google Sheets API Bug Report System

This implementation provides a simple, free bug reporting system that submits reports directly to a Google Spreadsheet.

## 🚀 Quick Setup

### 1. Google Cloud Console Setup

1. **Create a Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - (Optional) Restrict the key to Google Sheets API

### 2. Create Google Spreadsheet

1. **Create New Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new spreadsheet
   - Name it "Bug Reports" or similar

2. **Set Up Headers**
   - In row 1, add these column headers:
   ```
   A: Timestamp
   B: Type
   C: Priority
   D: Title
   E: Description
   F: Steps
   G: Expected Behavior
   H: Actual Behavior
   I: Browser
   J: OS
   K: Browser Version
   L: Contact Email
   M: Status
   ```

3. **Get Spreadsheet ID**
   - Copy the spreadsheet ID from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

### 3. reCAPTCHA Setup (Optional)

1. **Create reCAPTCHA Site**
   - Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
   - Create a new site with reCAPTCHA v3
   - Add your domain(s)
   - Copy Site Key

### 4. Environment Variables

Create a `.env` file in your project root:

```bash
# Google Sheets Configuration
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here

# reCAPTCHA Configuration (Optional)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

## 📋 Form Fields

The bug report form includes these fields:

### Required Fields
- **Type**: Bug/Feature/Improvement/Question
- **Priority**: Low/Medium/High/Critical
- **Title**: Short descriptive title (max 100 chars)
- **Description**: Detailed description (max 1000 chars)

### Optional Fields
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Contact Email**: For follow-up (optional)

### Auto-Detected Fields
- **Browser**: Chrome, Firefox, Safari, Edge
- **Browser Version**: Auto-detected version
- **Operating System**: Windows, macOS, Linux, Android, iOS
- **Screen Resolution**: Auto-detected
- **Timestamp**: Auto-generated

## 🔧 Technical Details

### API Endpoint
The system uses Google Sheets API v4:
```
POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
```

### Data Format
Each submission creates a new row with:
```javascript
[
  timestamp,           // A: Auto-generated
  type,               // B: Bug/Feature/etc
  priority,           // C: Low/Medium/High/Critical
  title,              // D: User input
  description,        // E: User input
  steps,              // F: User input
  expectedBehavior,   // G: User input
  actualBehavior,    // H: User input
  browser,            // I: Auto-detected
  os,                 // J: Auto-detected
  browserVersion,     // K: Auto-detected
  contactEmail,       // L: User input
  "New"               // M: Default status
]
```

## 🛡️ Security Features

### reCAPTCHA Protection
- **reCAPTCHA v3**: Invisible spam protection
- **Score-based**: Configurable threshold
- **Graceful Fallback**: Works without reCAPTCHA

### Input Validation
- **Client-side**: Real-time validation
- **Character Limits**: Prevents oversized submissions
- **Email Validation**: Proper email format checking

### API Security
- **API Key Restriction**: Limit to Google Sheets API
- **Rate Limiting**: Google API limits apply
- **CORS Protection**: Browser security

## 📊 Spreadsheet Management

### Viewing Reports
1. Open your Google Spreadsheet
2. Reports appear as new rows
3. Use filters to organize by type/priority
4. Sort by timestamp to see latest reports

### Managing Reports
- **Status Column**: Update M column (New → In Progress → Resolved)
- **Comments**: Add notes in additional columns
- **Filtering**: Use Google Sheets filters
- **Exporting**: Export to CSV/Excel as needed

## 🚨 Troubleshooting

### Common Issues

1. **"Connection not available"**
   - Check API key is correct
   - Verify Google Sheets API is enabled
   - Ensure spreadsheet ID is correct

2. **"reCAPTCHA not available"**
   - Check site key is correct
   - Verify domain is added to reCAPTCHA site
   - System continues without reCAPTCHA

3. **"Failed to submit"**
   - Check API key permissions
   - Verify spreadsheet is accessible
   - Check browser console for errors

### Testing

1. **Test Connection**
   - Form shows connection status
   - Green = Connected, Yellow = Failed

2. **Test Submission**
   - Fill out form completely
   - Submit and check spreadsheet
   - Verify data appears correctly

## 📈 Benefits

### For Users
- **Simple**: Easy to use form
- **Fast**: Quick submission
- **Secure**: reCAPTCHA protection
- **Responsive**: Works on all devices

### For Developers
- **Free**: No hosting costs
- **Reliable**: Google infrastructure
- **Scalable**: Handles many submissions
- **Accessible**: Spreadsheet interface

## 🔄 Future Enhancements

Possible improvements:
- **Email Notifications**: Notify on new reports
- **File Attachments**: Screenshot uploads
- **Status Updates**: Email status changes
- **Analytics**: Report statistics
- **Custom Fields**: Additional form fields

---

**Note**: This system is designed to be simple and free. For production use, consider implementing server-side validation and additional security measures.
