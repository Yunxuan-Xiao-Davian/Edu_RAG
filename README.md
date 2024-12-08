# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/292df2ee-41be-485d-aea7-1c7a97cfdffe

## About this Project

This is an Academic Research Assistant that implements a self-adaptive RAG (Retrieval-Augmented Generation) system. The application:

- Dynamically retrieves relevant academic documents based on user queries
- Uses embedding-based similarity matching for document retrieval
- Adapts its context window based on document relevance
- Supports multiple LLM providers (OpenAI, Deepseek, Groq)
- Allows manual document addition for custom knowledge bases

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/292df2ee-41be-485d-aea7-1c7a97cfdffe) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project leverages modern web technologies and AI capabilities:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Hugging Face Transformers (for embeddings)
- Multiple LLM providers support (OpenAI, Deepseek, Groq)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/292df2ee-41be-485d-aea7-1c7a97cfdffe) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## API Keys Configuration

To use the LLM features, you'll need to configure your API keys:

1. Click the API Settings button in the application
2. Add your API keys for any of the supported providers:
   - OpenAI
   - Deepseek
   - Groq

The keys are stored securely in your browser's localStorage.