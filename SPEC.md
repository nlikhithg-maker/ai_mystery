AI MYSTERY ROOM

Master Specification – Spec-Driven Development

Document Name: SPEC.md
Project Name: AI Mystery Room
Project Type: AI-Powered Interactive Mystery Investigation Platform
Development Methodology: Spec-Driven Development (SDD)
Frontend: React.js
Backend: Node.js + Express.js
Database: MongoDB
AI Integration: Google Gemini API
Architecture: MERN Stack
Document Version: 1.0
Status: Initial Development Specification

---

1. PROJECT OVERVIEW

1.1 Introduction

AI Mystery Room is an AI-powered interactive mystery investigation platform where users can create and solve fictional investigation cases based on their own stories or scenarios.

The platform allows users to enter a short scenario, incident, or story. Based on the submitted scenario, the backend uses Google's Gemini AI to generate a complete fictional mystery investigation.

The AI generates:

- A mystery storyline.
- A crime or mysterious incident.
- A list of suspects.
- One actual culprit.
- Suspect profiles and motives.
- Evidence and investigation reports.
- WhatsApp-style conversations.
- AI-generated images.
- CCTV-style investigation footage or simulated recordings.
- Witness statements.
- Clues and misleading evidence.
- A final explanation of the mystery.

Users investigate the case by examining the available evidence, connecting clues, and identifying the actual culprit.

At the end of the investigation, the user selects a suspect and submits their final answer.

The platform evaluates the answer and displays the investigation result, including whether the selected suspect is correct and the reasoning behind the solution.

1.2 Core Concept

User Story → AI Investigation Generation → Evidence Collection → Mystery Investigation → Culprit Selection → Result Evaluation

The central purpose is to provide an interactive detective experience using generative AI.

1.3 Project Objectives

1. Allow users to create mysteries using their own scenarios.
2. Automatically generate structured investigation cases using Gemini AI.
3. Provide multiple types of fictional evidence.
4. Make users think critically and connect different clues.
5. Provide an interactive investigation dashboard.
6. Allow users to submit their suspected culprit.
7. Evaluate answers and explain the actual mystery solution.
8. Maintain investigation history and user progress.
9. Provide an engaging, responsive, modern user interface.

---

2. PROJECT SCOPE

2.1 Features Included in MVP

The initial version must include:

1. Landing page.
2. User registration.
3. User login and logout.
4. Dashboard.
5. Create Mystery functionality.
6. Scenario submission.
7. Gemini AI mystery generation.
8. Suspect generation.
9. Evidence generation.
10. Evidence viewer.
11. WhatsApp-style chat evidence.
12. Image evidence.
13. CCTV-style simulated evidence.
14. Witness statements.
15. Investigation notes.
16. Suspect selection.
17. Final answer submission.
18. Result evaluation.
19. Solution reveal.
20. Investigation history.
21. User profile.

2.2 Features Excluded from MVP

The following features are not mandatory for the first release:

- Multiplayer investigations.
- Live multiplayer chat.
- Real-time collaborative investigation.
- Voice-based interrogation.
- Real-world crime investigation.
- Payments and subscriptions.
- Public mystery marketplace.
- User-created evidence uploads.
- Social media integration.
- Native Android or iOS applications.

These features may be introduced in future versions.

---

3. USER ROLES

The application will initially support two roles.

3.1 Guest User

A guest user can:

- Visit the landing page.
- View platform information.
- Explore sample mystery information.
- Register for an account.
- Log in.

Guest users cannot create or save investigations.

3.2 Registered User

A registered user can:

- Access the dashboard.
- Create new mysteries.
- Submit investigation scenarios.
- View AI-generated investigations.
- Examine suspects.
- Access evidence.
- Add investigation notes.
- Select a suspected culprit.
- Submit final answers.
- View investigation results.
- Access previous investigations.
- Delete their own investigations.
- Manage their profile.

---

4. USER WORKFLOW

4.1 Complete Application Workflow

The following workflow defines the expected application behavior.

1. User visits the website.
2. User registers or logs in.
3. User reaches the dashboard.
4. User clicks the Create Mystery button.
5. The system opens the mystery creation page.
6. User enters a scenario or story.
7. User optionally selects a difficulty level.
8. User submits the scenario.
9. Frontend sends the request to the backend.
10. Backend validates the submitted scenario.
11. Backend sends the scenario to Gemini AI.
12. Gemini generates the complete mystery investigation.
13. Backend validates the AI response.
14. Backend stores the generated investigation in MongoDB.
15. User is redirected to the investigation room.
16. User examines the case description.
17. User explores all available suspects.
18. User opens different evidence categories.
19. User examines messages, images, CCTV simulations, and witness statements.
20. User connects clues and records investigation notes.
21. User selects a suspected culprit.
22. User submits the final answer.
23. Backend evaluates the submitted suspect.
24. The system calculates the result.
25. The user sees the final result and explanation.
26. Investigation is marked as completed.
27. Investigation appears in the user's history.

4.2 Workflow Diagram

User
↓
Registration / Login
↓
Dashboard
↓
Create Mystery
↓
Enter Scenario
↓
Submit Scenario
↓
Backend Validation
↓
Gemini AI Processing
↓
Mystery Generation
↓
Evidence Generation
↓
MongoDB Storage
↓
Investigation Room
↓
Examine Evidence
↓
Analyze Suspects
↓
Select Culprit
↓
Submit Answer
↓
Result Evaluation
↓
Reveal Solution
↓
Investigation History

---

5. FUNCTIONAL REQUIREMENTS

Functional requirements define what the application must do.

FR-01: User Authentication

The system must provide secure user authentication.

Requirements:

- User registration using name, email, and password.
- User login using email and password.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected routes.
- Logout functionality.
- Duplicate email prevention.
- Authentication error handling.

Acceptance Criteria:

- Users can register successfully.
- Users can log in with valid credentials.
- Invalid credentials must display an appropriate error.
- Protected pages must not be accessible without authentication.
- Passwords must never be stored in plain text.

FR-02: Dashboard

The dashboard must provide a central location for accessing investigations.

Dashboard components:

- Welcome message.
- Create Mystery button.
- Total investigations.
- Completed investigations.
- Active investigations.
- Recent investigations.
- Investigation cards.
- User profile navigation.

Each investigation card should display:

- Mystery title.
- Difficulty.
- Creation date.
- Investigation status.
- Progress status.
- Continue Investigation button.

FR-03: Create Mystery

The user must be able to create a mystery by entering a scenario.

Input fields:

- Mystery scenario (required).
- Mystery title (optional).
- Difficulty level (optional).

Difficulty options:

1. Easy.
2. Medium.
3. Hard.

Scenario requirements:

- Minimum 30 characters.
- Maximum 2,000 characters.
- Must not be empty.
- Must be fictional or suitable for fictional mystery generation.

Default difficulty: Medium.

The system must generate a unique investigation for every successful request.

FR-04: AI Mystery Generation

Gemini AI must generate a complete fictional investigation from the user's scenario.

The AI must generate the following structured information:

A. Case Information

- Case ID.
- Case title.
- Case description.
- Incident type.
- Incident location.
- Incident date and time.
- Investigation introduction.
- Difficulty level.

B. Suspects

Generate between 3 and 5 suspects.

Each suspect must contain:

- Suspect ID.
- Full name.
- Age.
- Occupation.
- Profile description.
- Relationship with the victim or incident.
- Possible motive.
- Alibi.
- Suspicious behavior.
- Suspect image reference or generated image.

C. Actual Culprit

The AI must determine exactly one actual culprit.

The culprit must:

- Be included in the suspect list.
- Have a believable motive.
- Have an understandable connection to the incident.
- Be identifiable through evidence.
- Have a consistent explanation supported by the investigation.

IMPORTANT:

The actual culprit must remain hidden from the user until the answer is submitted or the user explicitly requests to reveal the solution.

D. Evidence

Generate between 6 and 12 evidence items.

Each evidence item must contain:

- Evidence ID.
- Evidence title.
- Evidence category.
- Evidence description.
- Evidence content.
- Related suspect IDs.
- Evidence importance.
- Reliability level.
- Investigation clue.
- Optional media reference.

Evidence categories:

1. Digital Messages.
2. Photographs.
3. CCTV Records.
4. Witness Statements.
5. Documents.
6. Physical Evidence.
7. Investigation Reports.

E. Investigation Solution

The AI must generate:

- Actual culprit ID.
- Culprit motive.
- Explanation of the incident.
- Timeline of events.
- Important clues.
- Explanation of misleading clues.
- Evidence supporting the culprit.
- Final case conclusion.

The solution must be stored separately from information returned to the investigation frontend.

FR-05: WhatsApp-Style Evidence

The system must support fictional chat evidence.

Requirements:

- Chat participant names.
- Participant profile images or initials.
- Message timestamps.
- Sent and received messages.
- Message ordering.
- Conversation date.
- Relevant conversation clues.

The interface should resemble a messaging application but must use original branding.

The messages must be generated by Gemini and stored as structured data.

FR-06: Image Evidence

The system must support AI-generated investigation images.

Examples:

- Crime scene photographs.
- Suspicious objects.
- Locations.
- Damaged property.
- Photographs of relevant fictional people.
- Screenshots of fictional documents.

Image requirements:

- Each image must have an evidence ID.
- Every image must have a description.
- Images must be connected to relevant evidence.
- Images must be stored using a media URL or storage reference.
- Image loading failures must have a fallback UI.

Gemini may generate image descriptions and image-generation prompts.

IMPORTANT TECHNICAL REQUIREMENT:

Gemini text generation and image generation are separate capabilities. Do not assume the Gemini text API automatically returns image files.

Use a compatible image-generation provider or service for actual image generation. The image provider must be configurable separately from the Gemini text model.

For MVP, generated images may be optional. The application must still work with textual evidence and image placeholders.

FR-07: CCTV-Style Evidence

The system must support fictional CCTV investigation evidence.

CCTV evidence may include:

- Camera location.
- Recording date.
- Recording time.
- Camera ID.
- Recording description.
- Observed activities.
- Important timestamps.
- Relevant suspect references.
- Video URL or simulated recording.

For MVP, CCTV can be implemented as a simulated CCTV player using:

- A static image.
- Timestamp overlays.
- Camera information.
- A timeline of observed events.
- AI-generated recording descriptions.

Actual video generation is not mandatory.

The UI must clearly identify simulated recordings as fictional AI-generated evidence.

FR-08: Witness Statements

The system must display fictional witness statements.

Each statement must contain:

- Witness name.
- Statement date.
- Statement time.
- Witness occupation.
- Statement content.
- Related suspect IDs.
- Reliability level.
- Associated clues.

Different witness statements may contain conflicting information, but the contradictions must be intentional and explainable.

FR-09: Investigation Room

The Investigation Room is the application's primary feature.

It must contain:

Header Section

- Case title.
- Case ID.
- Difficulty.
- Investigation status.
- Exit investigation button.

Main Layout

Left Sidebar:

- Case overview.
- Suspects.
- Evidence.
- Investigation notes.
- Timeline.

Main Content Area:

- Selected investigation section.
- Case information.
- Evidence viewer.
- Suspect details.

Right Sidebar:

- Investigation progress.
- Important clues.
- Suspect selection.
- Final submission.

The layout must be responsive.

FR-10: Investigation Notes

Users must be able to create and save personal investigation notes.

Requirements:

- Add a note.
- Edit a note.
- Delete a note.
- Associate a note with a suspect or evidence item.
- Automatically save notes when appropriate.

Notes must be private to the user.

FR-11: Culprit Selection

The system must provide a suspect selection interface.

Requirements:

- Display all available suspects.
- Allow selection of exactly one suspect.
- Provide a final confirmation step.
- Submit the selected suspect ID to the backend.
- Prevent multiple final submissions.

The user must not receive the correct culprit information before submission.

FR-12: Result Evaluation

The backend must compare the selected suspect ID with the actual culprit ID.

If correct:

- Display a success message.
- Show the culprit's identity.
- Explain the motive.
- Explain how the incident occurred.
- Show the evidence that proves the culprit's involvement.

If incorrect:

- Display an incorrect answer message.
- Reveal the actual culprit.
- Explain why the selected suspect was not responsible.
- Show the important clues that identify the actual culprit.

The investigation must be marked as completed after the final submission.

The result must be evaluated using the authoritative stored culprit ID, not an AI-generated evaluation of the user's answer.

FR-13: Investigation History

The system must store and display previously generated mysteries.

Each history item must include:

- Case title.
- Case ID.
- Creation date.
- Difficulty.
- Investigation status.
- Selected suspect.
- Result.
- Completion date.

Users must only access their own investigations.

FR-14: User Profile

The profile page must contain:

- User name.
- Email address.
- Registration date.
- Total investigations.
- Completed investigations.
- Correct investigations.
- Logout option.

---

6. AI INTEGRATION SPECIFICATION

6.1 AI Provider

Provider: Google Gemini

Integration: Gemini API through the official supported Google Gen AI SDK.

The API key must be stored in the backend environment variables.

Never expose the API key in frontend code.

6.2 AI Generation Process

The backend must follow this sequence:

1. Receive the scenario.
2. Validate the scenario.
3. Create a generation request.
4. Send a structured prompt to Gemini.
5. Request JSON-formatted output.
6. Parse the response.
7. Validate the generated structure.
8. Check suspect and evidence relationships.
9. Check that exactly one culprit exists.
10. Store the investigation.
11. Return only user-visible investigation information.

6.3 AI Prompt Requirements

Gemini must act as a professional fictional mystery writer and investigation designer.

The AI must:

- Create an engaging mystery.
- Maintain logical consistency.
- Generate believable suspects.
- Create one actual culprit.
- Generate evidence that supports the solution.
- Include misleading clues.
- Ensure all evidence has a purpose.
- Generate a solvable investigation.
- Avoid revealing the culprit in public case information.
- Ensure the final solution is consistent with the evidence.

6.4 AI Output Structure

Gemini must return structured JSON.

Conceptual example:

{
"case": {
"title": "The Missing Diamond",
"description": "A valuable diamond disappeared...",
"difficulty": "medium",
"location": "Grand Hotel"
},
"suspects": [
{
"id": "S1",
"name": "Alex Morgan",
"occupation": "Hotel Manager",
"motive": "Financial pressure",
"alibi": "Claims to be in the office"
}
],
"evidence": [
{
"id": "E1",
"type": "digital_message",
"title": "Suspicious Conversation",
"content": {},
"relatedSuspects": ["S1"]
}
],
"solution": {
"culpritId": "S1",
"motive": "Financial pressure",
"explanation": "..."
}
}

This is an illustrative structure. The actual production schema must include all required fields and validation rules.

6.5 AI Consistency Rules

The backend must enforce the following:

- Culprit ID must exist in the suspect list.
- Every referenced suspect ID must exist.
- Evidence IDs must be unique within a case.
- Suspect IDs must be unique within a case.
- Evidence must support a coherent investigation.
- Final solution must explain all major clues.
- Public case responses must not contain the solution.
- AI output must be validated before database storage.

If the response is invalid:

1. Attempt a controlled repair or regeneration.
2. Validate the repaired response.
3. If validation fails again, return a proper generation error.
4. Do not save an incomplete investigation.

6.6 AI Security

The system must protect against:

- Prompt injection.
- Malicious user scenarios.
- Unexpected AI output.
- Invalid JSON.
- Excessive token usage.
- API rate limits.
- Duplicate generation requests.

The system must treat user-provided scenarios as untrusted input.

AI output must never directly control backend operations or database queries.

---

7. TECHNOLOGY STACK

7.1 Frontend

Technology: React.js

Supporting technologies:

- React Router DOM – Navigation.
- Axios – API communication.
- Tailwind CSS – Styling.
- Lucide React – Icons.
- Context API – Authentication and global state.
- React Toastify or an equivalent notification library.

Frontend responsibilities:

- Display all pages.
- Manage user interactions.
- Handle forms.
- Communicate with backend APIs.
- Display investigation data.
- Display evidence.
- Manage loading and error states.
- Display investigation results.

7.2 Backend

Technology: Node.js

Framework: Express.js

Supporting packages:

- Mongoose.
- bcryptjs.
- jsonwebtoken.
- dotenv.
- cors.
- express-validator or Zod.
- Official Google Gen AI SDK.
- Helmet.
- Express rate limiter.

Backend responsibilities:

- Authentication.
- API handling.
- Input validation.
- Gemini integration.
- Mystery generation.
- Investigation management.
- Culprit evaluation.
- Database operations.
- Security and error handling.

7.3 Database

Database: MongoDB

ODM: Mongoose

MongoDB will store:

- User accounts.
- Mystery investigations.
- Suspects.
- Evidence.
- Investigation notes.
- User answers.
- Investigation results.
- Media references.

7.4 AI

Provider: Google Gemini

Responsibilities:

- Scenario analysis.
- Mystery creation.
- Suspect generation.
- Evidence generation.
- Witness statements.
- Investigation timelines.
- Final solution generation.

7.5 Media Storage

Actual generated media must be stored using a configurable object storage provider.

Examples:

- Cloudinary.
- Google Cloud Storage.
- Amazon S3.

MongoDB should store media URLs and metadata rather than large binary media files.

---

8. SYSTEM ARCHITECTURE

8.1 Architecture Overview

The application must follow a modular three-tier architecture.

Layer 1: Frontend

- React application.
- UI components.
- Pages.
- Authentication state.
- API services.

Layer 2: Backend

- Express server.
- Authentication middleware.
- Controllers.
- Services.
- AI integration.
- Validation.
- Business logic.

Layer 3: Database and External Services

- MongoDB.
- Gemini API.
- Image generation provider.
- Media storage provider.

8.2 Data Flow

React Frontend
↓
Axios API Request
↓
Express API
↓
Authentication Middleware
↓
Controller
↓
Service Layer
↓
Gemini API (when required)
↓
Validation
↓
MongoDB
↓
API Response
↓
React Frontend

8.3 Architectural Rules

- Frontend must never commu