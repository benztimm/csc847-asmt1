FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files
COPY . .

# Build the application
RUN npm run build

FROM nginx:1.19.8-alpine
COPY --from=0 /app/build /var/www/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
