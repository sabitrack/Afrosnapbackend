# AfroSnap AI Backend

A comprehensive Node.js/Express/TypeScript backend API for the AfroSnap AI cultural photo styling mobile application.

## 🚀 Features

- **Authentication & Authorization** - JWT-based user authentication
- **Cultural Data Management** - Continents, countries, and cultural styles
- **File Upload** - Photo upload and processing
- **AI Integration Ready** - Structured for AI styling suggestions
- **User Management** - Profiles, preferences, and statistics
- **Favorites System** - Save and manage favorite creations
- **Community Features** - Explore and share cultural creations
- **Security** - Rate limiting, CORS, input validation
- **API Documentation** - Swagger/OpenAPI integration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sabitrack/Afrosnapbackend.git
   cd Afrosnapbackend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user

### Users (`/api/users`)
- `GET /` - Get all users (protected)
- `GET /:id` - Get user by ID (protected)
- `PUT /me` - Update profile (protected)
- `DELETE /me` - Delete profile (protected)

### Continents (`/api/continents`)
- `GET /` - Get all continents
- `GET /:id` - Get continent by ID

### Cultures (`/api/cultures`)
- `GET /` - Get all cultures
- `GET /:id` - Get culture by ID
- `GET /country/:country` - Get cultures by country
- `GET /continent/:continent` - Get cultures by continent

### Upload (`/api/upload`)
- `POST /` - Upload photo file (protected)

### Suggestions (`/api/suggestions`)
- `POST /` - Get AI styling suggestions (protected)

### Preview (`/api/preview`)
- `POST /` - Generate final preview (protected)

### Favorites (`/api/favorites`)
- `GET /` - Get user favorites (protected)
- `POST /` - Add to favorites (protected)
- `DELETE /:id` - Remove from favorites (protected)

### Explore (`/api/explore`)
- `GET /` - Get explore/community items

### Profile (`/api/profile`)
- `GET /` - Get user profile (protected)
- `PUT /` - Update user profile (protected)

## 🗄️ Database Models

### User
- Authentication info (email, password)
- Profile data (name, avatar)
- Preferences (language, notifications, etc.)
- Statistics (creations, favorites, etc.)
- Achievements

### Continent
- Geographic regions
- Countries list
- Visual styling (colors, emoji)

### Culture
- Cultural styles and traditions
- Country and continent associations
- Difficulty levels and popularity
- Visual assets and descriptions

### Creation
- User-generated cultural photos
- Original and styled images
- Cultural context and metadata
- Social features (likes, shares, downloads)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Project Structure
```
src/
├── controllers/     # Route handlers
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── index.ts        # Server entry point
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Encryption** - bcrypt hashing
- **Rate Limiting** - Prevent abuse
- **CORS Protection** - Cross-origin security
- **Input Validation** - Request sanitization
- **Helmet** - Security headers

## 📖 API Documentation

Access interactive API documentation at:
```
http://localhost:5000/api/docs
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | Database connection | localhost:27017 |
| `JWT_SECRET` | JWT signing secret | required |
| `JWT_EXPIRES_IN` | Token expiration | 7d |
| `MAX_FILE_SIZE` | Upload size limit | 10MB |
| `RATE_LIMIT_MAX_REQUESTS` | Rate limit | 100 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@afrosnap.ai or create an issue in this repository.

---

**Built with ❤️ for cultural celebration and AI innovation** 