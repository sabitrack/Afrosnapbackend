# Deployment Guide for Render

## Prerequisites
- GitHub repository with the backend code
- MongoDB Atlas database
- Render account

## Step 1: Set up MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Replace `<db_password>` with your actual password

## Step 2: Deploy on Render

### Option A: Using Render Dashboard
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `afrosnap-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if needed)

### Option B: Using render.yaml (Blue Print)
1. Push the `render.yaml` file to your repository
2. Go to Render Dashboard
3. Click "New +" → "Blue Print"
4. Connect your repository
5. Render will automatically configure the service

## Step 3: Environment Variables
Set these environment variables in Render Dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment |
| `PORT` | `10000` | Port (Render sets this automatically) |
| `JWT_SECRET` | `your-secret-key` | JWT signing secret |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limiting window |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |
| `ALLOWED_ORIGINS` | `https://afrosnap.ai,https://afrosnapbackend.onrender.com` | CORS origins |

## Step 4: Deploy
1. Click "Create Web Service"
2. Wait for the build to complete
3. Your API will be available at: `https://your-service-name.onrender.com`

## Step 5: Test the API
Test these endpoints:
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/docs` - API documentation

## Troubleshooting

### Build Fails
- Check the build logs in Render Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation works locally

### API Not Responding
- Check if the service is running
- Verify environment variables are set
- Check the logs for errors

### CORS Issues
- Update `ALLOWED_ORIGINS` with your frontend domain
- Check if the origin is included in the CORS configuration

### Database Connection Issues
- Verify MongoDB Atlas connection string
- Check if IP whitelist includes Render's IPs
- Ensure database user has correct permissions

## Environment Variables Reference

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=https://afrosnap.ai,https://afrosnapbackend.onrender.com
``` 