FROM node:18

WORKDIR /app

# Copy package.json and lock file to install dependencies
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy the rest of your frontend files
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev"]
