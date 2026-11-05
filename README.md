# 🌱 Social Circle – Community Event Management Platform

**Social Circle** is a community-driven event management platform where people can create, discover, join, and manage social service events. The platform encourages people to participate in meaningful activities and make a positive impact on their communities.

From food drives and winter clothing distributions to educational programs and environmental campaigns, Social Circle makes community participation easier and more organized.

## ✨ Key Features

### 👤 Authentication
- User registration and login with Better Auth.
- GitHub social login.
- Secure authentication using JWT.
- Protected API routes.
- User-specific event management.

### 📅 Event Management
- Create community service events.
- Browse all published events.
- View detailed event information.
- Update events created by the logged-in user.
- Delete your own events.
- Select event categories, dates, times, and locations.


### 🤝 Volunteer Participation
- Join community events.
- Leave events whenever needed.
- Prevent duplicate event registrations.
- View all joined events.
- Track volunteer participation counts.


### 🔐 Security
- JWT-based API authentication using Better Auth.
- Backend token verification using `jose`.
- Public and protected API routes.
- User identity is extracted from verified JWT tokens.
- Event ownership verification for update and delete operations.
- Users can only manage their own events and joined records.


### 🎨 User Interface
- Responsive design for mobile, tablet, and desktop.
- Light and dark theme support.
- Modern UI with a green-themed design.
- Interactive forms and dialogs.
- Loading, empty, and error states.


## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Authentication | Better Auth |
| Authentication Plugin | Better Auth JWT Plugin |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| JWT Verification | jose |
| API | REST API |
| Theme | next-themes |
| Version Control | Git & GitHub |

