FROM node:22.14

# Set working directory
WORKDIR /PISYNC-BACKEND

# Copy package.json and package-lock.json first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Use JSON array format for CMD
CMD ["npm", "run", "start"]
