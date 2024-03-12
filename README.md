# Salesforce Lightning Web Component ToDo App

Welcome to the Salesforce Lightning Web Component ToDo App! This application is designed to showcase how you can leverage the power of Salesforce LWC to build a dynamic and responsive ToDo list application. Manage your tasks with ease and integrate seamlessly into your Salesforce environment.

## Features

- **Task Management**: Create, read, update, and delete your tasks in a user-friendly interface.
- **Prioritization**: Assign priorities to your tasks to manage your workload effectively.
- **Status Updates**: Easily mark your tasks as complete or in progress.
- **Salesforce Integration**: Fully integrated with Salesforce, allowing for easy deployment and use within your Salesforce org.

## Installation

To install this app in your Salesforce org, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/iae1/salesforce-lwc-todo-app.git
    ```
2. **Deploy to Salesforce**:
    - Make sure you have the Salesforce CLI installed.
    - Navigate to the project directory and log in to your Salesforce org:
        ```sh
        sfdx auth:web:login --setalias yourOrgAlias --instanceurl https://login.salesforce.com
        ```
    - Deploy the app using:
        ```sh
        sfdx force:source:deploy -p force-app
        ```

Adding a section on integrating a custom backend using a third-party API with your Salesforce Lightning Web Component (LWC) ToDo app is crucial for users who need to connect the app with their existing infrastructure. Here's how you could structure this section in your README file:

Absolutely, including a section that references your backend written in Go and linking to another GitHub repository is a great way to organize and provide comprehensive documentation for your project. Below is how you can structure this section in your README file:

## Backend Integration

This Salesforce Lightning Web Component ToDo App is designed to work with a custom backend service, which handles tasks such as storing, managing, and retrieving ToDo items. Our backend is developed in Go and is hosted in a separate GitHub repository.

### Accessing the Backend Service Code

For details on the backend service, including its architecture, APIs, and how to deploy it, please visit our GitHub repository dedicated to the backend service:

[Go Backend for Salesforce LWC ToDo App](https://github.com/iae1/go-todo-app)

Please follow the instructions in the backend repository's README to set up and run the backend service. Ensure that the backend service is running and accessible before attempting to connect it with this Salesforce LWC ToDo App.

### Integrating the Backend Service

After setting up and running your Go backend, follow the steps in the [Integrating with a Custom Backend](#integrating-with-a-custom-backend) and [Configuring CORS for Secure API Communication](#configuring-cors-for-secure-api-communication) sections to integrate it with this LWC app. Ensure you replace placeholders with actual values from your Go backend configuration, such as the base URL and any required API keys or tokens.


### Setting Up Custom Environment Variables

Salesforce allows you to use custom metadata types or named credentials to securely store environment variables such as your API keys and endpoints. In the case of this project, you're going to want to store Here's how you can set them up:

**Using Custom Metadata Types**:
   - Go to Setup in your Salesforce org.
   - In the Quick Find box, type "Custom Metadata Types" and select it.
   - Click "Manage Records" next to the custom metadata type you want to use (you may need to create one if you haven't already).
   - Add a new record, providing your API's base URL and any necessary keys or tokens as values.

### Accessing Environment Variables in Your LWC

Example of accessing a named credential URL:

```java
public with sharing class TodoAPIController {
    // This method is cacheable and can be used with @wire in LWC
    @AuraEnabled(cacheable=true)
    public static String getProdUrl() {
        // Query the Custom Metadata Type for the URL
        Todo_API__mdt apiConfig = [
            SELECT prod_url__c 
            FROM Todo_API__mdt 
            LIMIT 1
        ];

        return apiConfig != null ? apiConfig.prod_url__c : null;
    }
}
```

To ensure your Salesforce Lightning Web Component (LWC) ToDo app can securely communicate with your custom backend, you'll need to configure Cross-Origin Resource Sharing (CORS). CORS is a security feature that allows or restricts resources on a web page to be requested from another domain outside the domain from which the first resource was served. Here's how to add a section on configuring CORS for your app:


## Configuring CORS for Secure API Communication

To allow your Salesforce Lightning Web Component ToDo App to make requests to your third-party API, you need to configure Cross-Origin Resource Sharing (CORS) settings in both your Salesforce org and your custom backend. This configuration is crucial for ensuring that your app can securely access the API without exposing it to unnecessary security risks.

### Configuring CORS in Your Salesforce Org

Follow these steps to add your third-party API's domain to the list of allowed origins in your Salesforce org:

1. **Navigate to Setup** in your Salesforce org.
2. In the Quick Find box, **type "CORS"** and select it under Security.
3. Click **"New"** to add a new allowed origin.
4. In the Origin URL field, **enter the URL** of your third-party API. Be sure to include the protocol (`http://` or `https://`) and avoid trailing slashes.
5. **Save** your changes.

By adding your API's domain to the allowed origins, Salesforce will accept incoming requests from your API, enabling your LWC to communicate with it.

### Configuring CORS on Your Custom Backend

The steps to configure CORS on your backend depend on the technology or framework you're using. Below is a generic example of how to enable CORS for a typical web server. If you're using a specific backend technology (like Node.js, .NET, or Java), you'll need to consult the relevant documentation for CORS configuration instructions.

#### Example: Enabling CORS in an Express.js Server

If your backend is built with Express.js, you can use the `cors` middleware to easily configure CORS:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'https://your-salesforce-org-domain.com',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.get('/todos', (req, res) => {
    res.json({ message: 'This is your ToDo list' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Replace `'https://your-salesforce-org-domain.com'` with the actual domain of your Salesforce org to ensure that only requests originating from your Salesforce app are allowed.

### Testing CORS Configuration

After configuring CORS both in Salesforce and your backend, it's important to test the setup to ensure that your LWC can successfully make API calls to your backend without encountering CORS errors.

- Attempt to perform API operations (CRUD) from your LWC.
- Check the browser's developer console for any CORS-related errors.
- If you encounter errors, review your configurations to ensure that the origins match exactly and that the appropriate headers are being sent.

---

Adding CORS validation ensures that your app communicates securely with your custom backend. Proper configuration prevents unauthorized domains from accessing your API, enhancing the security of your application and data.
---

This section provides a basic outline for integrating your Salesforce LWC ToDo app with a custom backend using a third-party API. Adapt the instructions based on the specific requirements and configurations of your backend and Salesforce org.

## Usage

Once installed, you can access the ToDo app directly from your Salesforce org's App Launcher. Create new tasks, set their priority, mark them as completed, and manage your day-to-day activities with ease.

## Contributing

Contributions to the Salesforce Lightning Web Component ToDo App are welcome! Here are a few ways you can contribute:

- **Reporting Bugs**: If you find a bug, please open an issue describing the bug and how to reproduce it.
- **Suggesting Enhancements**: Have an idea to make this app even better? Open an issue with your suggestion.
- **Pull Requests**: Want to contribute directly to the codebase? Fork the repository, make your changes, and submit a pull request.

Please refer to our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
