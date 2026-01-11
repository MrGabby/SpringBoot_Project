# Crop Deal - Spring Boot Application

This is a Spring Boot application that replicates the .NET Crop Deal backend API.

## Features

- RESTful API endpoints for managing:
  - Users
  - Crop Details
  - Bank Details
  - Weather Forecast
- Swagger/OpenAPI documentation
- JPA/Hibernate for database operations
- PostgreSQL database support

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL (or update application.properties to use H2 for development)

## Setup Instructions

1. **Configure Database**
   - Update `src/main/resources/application.properties` with your PostgreSQL credentials
     - Default connection: `jdbc:postgresql://localhost:5432/crop_deal`
     - Update username and password as needed
   - Or use H2 in-memory database for development (already configured as fallback)

2. **Build the Project**
   ```bash
   mvn clean install
   ```

3. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```
   Or run the main class: `com.cropdeal.CropDealApplication`

4. **Access Swagger UI**
   - Open your browser and navigate to: `http://localhost:8080/swagger-ui.html`
   - API documentation is also available at: `http://localhost:8080/api-docs`

## API Endpoints

### User APIs
- `POST /api/User` - Create a new user
- `GET /api/User` - Get all users
- `GET /api/User/{id}` - Get user by ID
- `DELETE /api/User/{id}` - Delete user

### Crop Detail APIs
- `GET /api/Crop_detail` - Get all crop details
- `GET /api/Crop_detail/{id}` - Get crop detail by ID
- `POST /api/Crop_detail` - Create crop detail
- `PUT /api/Crop_detail/{id}` - Update crop detail
- `DELETE /api/Crop_detail/{id}` - Delete crop detail

### Bank Detail APIs
- `GET /api/Bank_detail` - Get all bank details
- `GET /api/Bank_detail/{id}` - Get bank detail by ID
- `POST /api/Bank_detail` - Create bank detail
- `DELETE /api/Bank_detail/{id}` - Delete bank detail

### Weather Forecast API
- `GET /WeatherForecast` - Get weather forecast

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── cropdeal/
│   │           ├── config/          # Configuration classes
│   │           ├── controller/      # REST controllers
│   │           ├── dto/             # Data Transfer Objects
│   │           ├── model/           # Entity models
│   │           ├── repository/      # JPA repositories
│   │           ├── service/         # Business logic services
│   │           └── CropDealApplication.java
│   └── resources/
│       └── application.properties   # Application configuration
└── test/
    └── java/                        # Test classes
```

## Database Configuration

The application uses PostgreSQL by default. To configure:

1. **PostgreSQL Setup:**
   - Create a database named `crop_deal` (or update the connection string)
   - Update `application.properties` with your PostgreSQL username and password
   - Default port: 5432

2. **Using H2 (in-memory database) for development:**
   - Comment out PostgreSQL configuration in `application.properties`
   - Uncomment H2 configuration
   - The database will be created automatically on startup

## Technologies Used

- Spring Boot 3.2.0
- Spring Data JPA
- Hibernate
- Swagger/OpenAPI 3
- Maven
- Lombok (for reducing boilerplate code)
- Validation API

## Notes

- The application uses JPA/Hibernate for ORM
- Database tables are auto-created on startup (ddl-auto=update)
- Swagger UI is available for testing all APIs
- All endpoints follow RESTful conventions
