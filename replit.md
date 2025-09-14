# MealMind AI - Personalized Meal Planning Platform

## Overview

MealMind AI is a comprehensive meal planning platform that leverages artificial intelligence to create personalized nutrition plans. The system combines a React-based frontend with a FastAPI backend to deliver customized meal plans based on user preferences, health goals, dietary restrictions, and physical characteristics. The platform supports various dietary preferences (vegetarian, vegan, keto, paleo) and health conditions (diabetes, weight loss, muscle gain), providing detailed meal breakdowns with nutritional information, ingredient lists, and PDF export capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React 18 with TypeScript, utilizing Vite as the build tool for optimal development experience and performance. The application follows a component-based architecture with:

- **UI Framework**: Radix UI components with Tailwind CSS for styling, providing a consistent design system
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: React Router for client-side navigation with protected routes
- **Authentication**: Token-based authentication with localStorage persistence
- **Styling**: Tailwind CSS with custom design tokens and Inter font for typography

The frontend implements a responsive design pattern with mobile-first considerations and provides features like PDF generation (using jsPDF), calendar views for meal planning, and a chatbot interface for user assistance.

### Backend Architecture
The backend uses FastAPI with a modular router structure, implementing a clean separation of concerns:

- **API Framework**: FastAPI for high-performance asynchronous API development
- **Database**: SQLite with SQLAlchemy ORM for data persistence
- **Authentication**: JWT tokens with bcrypt password hashing
- **AI Integration**: OpenAI API integration through LangChain for meal plan generation
- **Background Tasks**: Celery with Redis for asynchronous email notifications
- **Data Validation**: Pydantic models for request/response validation

The backend follows a layered architecture with dedicated modules for routes, models, services, and utilities. Each functional area (authentication, meal planning, notifications) is separated into distinct routers.

### Database Design
The system uses SQLAlchemy models with two primary entities:

- **User Model**: Stores user authentication data, trial information, and subscription status
- **MealPlan Model**: Contains plan metadata (title, duration, goals, dietary preferences)
- **Meal Model**: Stores daily meal data with JSON fields for breakfast, lunch, dinner, and snacks

The database schema supports rich meal data storage with nutritional information and allows for flexible meal customization.

### AI Meal Generation
The platform integrates with OpenAI's API to generate personalized meal plans using:

- **TDEE Calculation**: Total Daily Energy Expenditure based on user demographics and activity level
- **Nutritional Targeting**: Macronutrient distribution aligned with health goals
- **Dietary Compliance**: Meal generation respects allergies, dietary preferences, and health conditions
- **Structured Output**: AI responses are formatted as JSON with detailed meal information including ingredients, calories, and macros

### Authentication & Security
The system implements JWT-based authentication with:

- **Token Management**: Secure token generation and validation using python-jose
- **Password Security**: bcrypt hashing for password storage
- **Route Protection**: Frontend and backend route guards for authenticated access
- **Trial Management**: Built-in 7-day trial system with subscription upgrade paths

## External Dependencies

### Core Technologies
- **OpenAI API**: Powers the AI meal plan generation with GPT models
- **Google OAuth**: Planned integration for social authentication
- **Google Fit API**: Integration for fitness tracking and activity data synchronization

### Frontend Dependencies
- **React Ecosystem**: React 18, React Router, React Hook Form for form management
- **UI Components**: Radix UI primitives, Lucide React icons, date-fns for date handling
- **Development Tools**: Vite, TypeScript, Tailwind CSS, ESLint for code quality

### Backend Dependencies
- **FastAPI Stack**: FastAPI, Uvicorn, SQLAlchemy, Pydantic for API development
- **AI & ML**: OpenAI, LangChain for natural language processing
- **Background Processing**: Celery, Redis for task queuing
- **Communication**: Email integration for notifications, planned WhatsApp integration

### Development & Deployment
- **Build Tools**: Vite for frontend bundling, Python packaging for backend
- **Database**: SQLite for development with migration support for production databases
- **CORS**: Configured for cross-origin requests between frontend and backend
- **Environment Management**: Environment variables for API keys and configuration

The architecture is designed to be scalable and maintainable, with clear separation between presentation, business logic, and data layers. The modular design allows for easy extension of features and integration of additional services.