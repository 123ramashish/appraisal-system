Appraisal System - Overview    
Project Overview    
The Appraisal System is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Next.js for server-side rendering. This application allows participants to fill out self-appraisals, while managers, colleagues, and juniors can also submit appraisals for them. The admin has the ability to create appraisal questions, map participants to their supervisors, peers, and juniors, and view all submitted forms.    

Features    
Role-Based Access: Different functionalities for Admin, Managers, and Participants.    
Self-Appraisal: Participants can fill out their own appraisals.    
Manager Appraisal: Managers can fill out appraisals for their direct reports.    
Colleagues' Appraisal: Colleagues and juniors can fill out appraisals for the participant.    
Form Visibility:    
Admin can view all submitted forms.    
Managers can view their own appraisals and the self-appraisal of the participant.    
Colleagues and juniors can only view their own submitted forms.    
Dynamic Questions: Admin can create appraisal questions that are consistent across all roles.    
Technology Stack   
Frontend: React.js with Next.js for SSR    
Backend: Node.js with Express.js    
Database: MongoDB    
Authentication: JWT (JSON Web Tokens)    
Directory Structure    

/appraisal-system
├── /client                 # Frontend application using Next.js     
│   ├── /components         # Reusable components      
│   ├── /pages              # Pages for routing      
│   ├── /public             # Static assets       
│   ├── /styles             # Global styles      
│   └── /utils              # Utility functions      
├── /server                 # Backend application     
│   ├── /controllers        # Request handlers     
│   ├── /models             # Mongoose models      
│   ├── /routes             # API routes     
│   ├── /config             # Configuration files     
│   └── /middlewares        # Middleware functions     
├── package.json            # Project metadata and dependencies     
└── README.md               # Project overview and instructions     

Installation Instructions     
Clone the Repository:       
git clone https://github.com/123ramashish/appraisal-system.git    
cd appraisal-system     

Install Dependencies:    

Navigate to the server directory and install backend dependencies:     
cd server     
npm install     
Navigate to the client directory and install frontend dependencies:      
cd ../client     
npm install     

Running the Application     
Start the Backend Server:     

Navigate to the server directory and run:     
cd server     
npm run dev     

Start the Frontend Application:     

Navigate to the client directory and run:     
cd ../client    
npm run dev    
  
Access the Application:     

Open your browser and go to http://localhost:5173 to access the application.        

Working     
Admin Functionality: Admin can create questions, map participants to their respective supervisors, peers, and juniors, and view all appraisal submissions.     
Participant Functionality: Participants can fill out their self-appraisal forms.     
Manager Functionality: Managers can fill out appraisals for their direct reports and view self-appraisals.     
Colleagues and Juniors Functionality: They can fill out appraisals for their peers and view their own submissions.     

Conclusion      
This Appraisal System is designed to streamline the appraisal process within ABC Company, ensuring that all roles have their specific functionalities and access levels. The application is built with a focus on     usability and efficiency, making it a valuable tool for performance management.    
