# TopTodo 

A simple, fast, and interactive Todo List application built with Vanilla JavaScript and modern tooling.

🔗 **[Live Preview](https://Sc0rpX.github.io/TopTodo/)**

## 🛠️ Built With
* HTML, CSS, and Vanilla JavaScript
* **Webpack** (for bundling)
* **date-fns** (for date formatting)

## 💡 What I Learned

Building this project was a great dive into modern JavaScript architecture and front-end tooling. Here are the key things I learned:

* **Webpack Configuration:** I learned how to set up Webpack from scratch and create separate configurations for `development` (with a live dev-server) and `production` (optimized for deployment).
* **Local Storage:** I implemented browser `localStorage` so that user data persists even after refreshing the page or closing the tab.
* **Working with JSON:** I learned how to use `JSON.stringify()` to convert JavaScript objects/arrays into text for storage, and `JSON.parse()` to turn them back into usable data.
* **Class Rehydration:** I tackled the challenge of losing Object-Oriented Class methods when saving to JSON, and learned how to "rehydrate" plain data back into functional Class instances when loading the app.
* **DOM Manipulation:** Keeping the UI strictly separated from the application's underlying data logic.

## 🚀 How to Run Locally

If you want to download and run this project on your own machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/Sc0rpX/TopTodo.git](https://github.com/Sc0rpX/TopTodo.git)
2. Install the dependencies:
    ```bash
    npm install
3. Start the development server:
    ```bash
    npm start