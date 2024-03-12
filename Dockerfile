FROM node:16-alpine AS builder

#working directory
WORKDIR /app/panel

#Copy package.jsons to the working dir
COPY package.json package-lock.json ./

RUN npm install

#Copy the rest of the application code
COPY . .

RUN npm run build

#production image/web server
FROM nginx:alpine AS production

#Copy built app from development stage to nginx web root dir
COPY --from=builder /app/panel/dist /usr/share/nginx/html

EXPOSE 80

# will use later
# COPY nginx.conf /etc/nginx/nginx.conf

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
