# StreamVibe Frontend

This is the frontend code for the StreamVibe streaming platform. It's built with Next.js and designed to connect to the backend API from the [streaming-platform-app](https://github.com/AmrAdel01/streaming-platform-app) repository.

## Getting Started

1. Clone this repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env.local` file with the following variables:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   \`\`\`
   (Replace with the actual URL of your backend API)

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Connecting to the Backend

This frontend is designed to connect to the backend API from the streaming-platform-app repository. To connect to the backend:

1. Clone the backend repository:
   \`\`\`bash
   git clone https://github.com/AmrAdel01/streaming-platform-app.git
   \`\`\`

2. Follow the setup instructions in the backend repository's README

3. Update the `NEXT_PUBLIC_API_URL` in your `.env.local` file to point to your running backend

## Features

- Video browsing and playback
- User authentication
- Video uploading and management
- Comments and interactions
- Responsive design for all devices

## Folder Structure

- `/app` - Next.js app router pages
- `/components` - Reusable UI components
- `/contexts` - React context providers
- `/lib` - Utility functions and helpers
