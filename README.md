# Event Hub
A web application to help users find ideal meetup venues for an Event based on location and preferences.

- Built with MERN stack (MongoDB, Express.js, React.js, Node.js).
– Secure authentication (login, signup, password recovery, Sign In with Google).
– APIs for location-based venue recommendations, based on proximity and user-defined criteria.
– Third-party APIs for traffic, maps, and venue ratings.
– Optimized database for user preferences and scheduled meetups.
– Payment integration using Stripe for secure and seamless transaction handling.
– Responsive, user-friendly platform for better social meetups.
– Mobile responsiveness and intuitive UI for an enhanced user experience.
– Proper state management and a personalized platform for social event planning.
– Integrated chat feature with group chat support for real-time user interaction.

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Backend](#backend)
   - [Routes](#routes)
   - [Controllers](#controllers)
   - [Models](#models)
4. [Frontend](#frontend)
   - [Pages](#pages)
   - [Components](#components)
5. [Setup and Running Locally](#setup-and-running-locally)
6. [Environment Variables](#environment-variables)

---

## Features

- User authentication (login, signup, Google OAuth).
- Concert creation and management for admins.
- Explore upcoming concerts and register for events.
- Real-time navigation to event locations using Mapbox and Leaflet.js.
- Social features like connecting with friends and group chats.
- Payment integration for ticket purchases using Stripe.

---

## Project Structure

---

## Backend

### Routes

The backend exposes several API endpoints:

1. **User Routes** (`/api/v1/users`)
   - `/register` - Register a new user.
   - `/login` - Login a user.
   - `/logout` - Logout a user.
   - `/update-details` - Update user details.
   - `/forgot-password` - Request a password reset.
   - `/reset-password/:token` - Reset password using a token.

2. **Concert Routes** (`/api/v1/concert`)
   - `/add-concert` - Add a new concert (admin only).
   - `/upcoming-concert` - Fetch all upcoming concerts.
   - `/register-for-concert/:Id` - Register for a concert.
   - `/my-attended-concerts` - Fetch attended concerts.
   - `/my-upcoming-concerts` - Fetch upcoming concerts.

3. **Friends Routes** (`/api/v1/friends`)
   - `/request-friend/:friendId` - Send a friend request.
   - `/my-friends` - Fetch all friends.
   - `/response-request/:requestId` - Respond to a friend request.

4. **Chat Routes** (`/api/v1/chat`)
   - `/accesschat` - Access a chat.
   - `/fetchchat` - Fetch all chats.
   - `/group` - Create a group chat.

5. **Message Routes** (`/api/v1/message`)
   - `/:chatId` - Fetch all messages in a chat.
   - `/sendmessage` - Send a message.

### Controllers

- **User Controller**: Handles user-related operations like registration, login, and profile updates.
- **Concert Controller**: Manages concert creation, registration, and retrieval.
- **Chat Controller**: Handles chat creation and management.
- **Message Controller**: Manages sending and retrieving messages.

### Models

- **User Model**: Defines the schema for user data, including authentication tokens and relationships.
- **Concert Model**: Represents concert details like artist, location, and ticket price.
- **Chat Model**: Defines group and individual chat structures.
- **Message Model**: Stores chat messages.

---

## Frontend

### Pages

1. **LandingPage**: The homepage showcasing trending concerts and features.
2. **Dashboard**: User dashboard with options to view events, profile, and expenditures.
3. **Profile**: Displays user details and allows profile updates.
4. **CreateConcert**: Admin page for creating new concerts.
5. **Map**: Displays navigation routes using Leaflet.js.
6. **SelectPlace**: Allows users to select a destination from nearby places.
7. **Chat**: Real-time chat interface for users.
8. **UpcomingConcerts**: Lists all upcoming concerts.

### Components

- **Navbar**: Navigation bar for the application.
- **Footer**: Footer with links and additional information.
- **Dashboard Components**: Includes sections for events, friends, and expenditures.
- **Map Components**: Includes `ShowLocation` and `NavigateLocation` for map-related tasks.

---

## Setup and Running Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Stripe account for payment integration
- Mapbox and Grasshopper API keys for maps

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend

