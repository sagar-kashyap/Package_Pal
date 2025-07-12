# Run and deploy your AI Studio app

Package pal is a package finding app which is powered by Google Gemini API to find a suitable package for you project. It requires 3 inputs-

1. Package name(for which you want the alternative package in your desired programming language)
2. The programming language for which you provided the above package name
3. The desired programming Language for which you are looking for the package

After this click on the Find Package button and the app will provide you a list of packages most similar to your provided package.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
