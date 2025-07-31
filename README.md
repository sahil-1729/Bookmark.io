# Bookmark.io

## Project Overview

Bookmark.io is a modern web application designed to help you collect, save, and organize your online content efficiently. Beyond just links, you can manage newsletters, articles, and more, all in one centralized place. It provides a seamless experience for bookmark management, categorization, and quick access to your saved resources.

## Features

* **Authentication:** Secure user authentication using email/password and Google OAuth, powered by Supabase.
* **Bookmark Management:**
    * Add new bookmarks with ease.
    * Edit existing bookmarks, including their metadata, categories, and labels.
    * Delete bookmarks you no longer need.
    * Organize your bookmarks into custom categories and apply multiple labels for detailed sorting.
    * Mark bookmarks as visited or unvisited to keep track of your consumption.
    * Automatically fetches metadata (like title) for added links to provide more context.
* **Intuitive User Interface:**
    * Responsive design with a dynamic sidebar that adapts for desktop and mobile views.
    * Toggle between Light and Dark themes for personalized viewing.

## Technologies Used

* **Framework:** Next.js
* **Backend & Authentication:** Supabase
* **Styling:** Tailwind CSS
* **UI Components:** Shadcn UI (built on Radix UI)
* **Form Management:** React Hook Form & Zod
* **Tag Input:** Emblor
* **Utility Libraries:** `clsx`, `tailwind-merge`, `lodash`, `usehooks-ts`
* **Metadata Fetching:** `url-metadata`, `metadata-scraper`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version recommended)
* npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd bookmark.io
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up Supabase:**
    * Create a new project on [Supabase](https://supabase.com/).
    * Navigate to **Authentication -> Providers** in your Supabase dashboard.
    * Enable **Google** as an authentication provider.
    * You will need to configure your Google OAuth credentials:
        * Go to the [Google Cloud Console](https://console.cloud.google.com/).
        * Create a new project or select an existing one.
        * Navigate to **APIs & Services -> Credentials**.
        * Create an **OAuth client ID** of type **Web application**.
        * Add `http://localhost:3000` to **Authorized JavaScript origins**.
        * Add `http://localhost:3000/auth/callback` to **Authorized redirect URIs**.
        * Copy the **Client ID** and **Client Secret** and paste them into the Google provider settings in your Supabase dashboard.
    * Ensure your database tables are set up correctly (e.g., `bookmarks` table as used in `src/server-actions/addBookmark.tsx` and `src/types.tsx`).
    * Copy your Supabase project's API URL and Anon Key.

4.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following:

    ```
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    Replace `"YOUR_SUPABASE_URL"` and `"YOUR_SUPABASE_ANON_KEY"` with your actual Supabase project details.

### Running the Development Server

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
