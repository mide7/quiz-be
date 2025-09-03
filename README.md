
# Quiz App (Node.js + Express + Postgres + Drizzle ORM)

This project is a backend service for managing quizzes.  
It is built with **Node.js**, **Express**, **PostgreSQL**, and **Drizzle ORM**.

---

## 🚀 How to Run the Project

### Prerequisites
- [Node.js v20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (recommended for running Postgres)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mide7/quiz-be.git
   cd quiz-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```bash
   cp .env.example .env
   ```
   Fill in the values for the environment variables in the `.env` file.

4. **Start the Postgres container**
   ```bash
   docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres postgres:latest
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```   
   The server will be running at `http://localhost:<port>` by default.

6. **Open the project in your browser**
   ```bash
   open http://localhost:<port>
   ```

### Production Deployment
1. **Build the project**
   ```bash
   npm run build    
   ```

2. **Start the server**
   ```bash
   npm start        
   ```

3. **Open the project in your browser**
   ```bash
   open http://localhost:<port>     
   ```
