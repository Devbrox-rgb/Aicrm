AI-First CRM (HCP Interaction System)

An AI-powered CRM interaction logging system built using React, FastAPI, LangGraph, and LLMs (Groq/OpenAI-compatible).

This project demonstrates how AI can control and populate CRM interaction forms through natural language conversations instead of manual form filling.

Overview

The application uses an AI assistant to log and manage HCP (Healthcare Professional) interactions.

Instead of manually filling CRM forms, users interact with the AI assistant using natural language. The AI processes the conversation, extracts structured information, analyzes sentiment, generates follow-up actions, and automatically updates the CRM form.

The frontend follows a split-screen layout:

Left side → Interaction details form
Right side → AI assistant chat panel

The AI assistant completely controls the form updates.

Key Features
AI-controlled CRM interaction form
Natural language interaction logging
Automatic extraction of structured data
AI-powered edit/update flow
Sentiment analysis
Follow-up recommendation generation
Date and time extraction
Split-screen React UI
LangGraph-based tool orchestration
LangGraph Tools Implemented
1. Log Interaction Tool

Extracts structured CRM interaction data from natural language prompts.

Example:
“Today I met Dr Smith and discussed Product X. The sentiment was positive.”

The AI automatically fills the interaction form.

2. Edit Interaction Tool

Updates only specific fields based on correction prompts.

Example:
“Sorry, the name was actually Dr John and the sentiment was negative.”

The AI updates only the corrected fields while preserving all other data.

3. Analyze Sentiment Tool

Detects interaction sentiment:

Positive
Neutral
Negative
4. Generate Follow-Up Tool

Creates AI-generated next-step recommendations based on the interaction.

5. Extract DateTime Tool

Extracts date and time information from natural language conversations.

Tech Stack
Frontend
React
Vite
JavaScript
Backend
FastAPI
LangGraph
SQLAlchemy
Pydantic
AI / LLM
Groq API
OpenAI-compatible models
Application Flow
User types interaction details in the AI chat panel
Frontend sends the message to the FastAPI backend
LangGraph processes the request using AI tools
Structured interaction data is generated
Data is stored in the database
Frontend automatically updates the CRM form
Frontend Features
Modern split-screen UI
AI assistant chat interface
Real-time form updates
Read-only CRM form
AI-driven edit flow
Responsive layout
Modern chat bubbles and card-based design
API Endpoints
POST /interaction/chat

Processes natural language interaction prompts using AI and LangGraph tools.

POST /interaction/log

Manual interaction logging endpoint.

GET /interaction/

Fetches all saved interactions.

Example Workflow
User Input

“Today I met Dr Smith and discussed Product X efficiency. The sentiment was positive and brochures were shared.”

AI Processing

The AI:

Extracts HCP name
Detects sentiment
Identifies discussion topics
Generates follow-up suggestions
Extracts additional interaction details
Form Update

The interaction form is automatically populated with the extracted data.

Edit Flow Example
User Correction

“Sorry, the name was actually Dr John and the sentiment was negative.”

AI Action

The AI updates only:

HCP Name
Sentiment

All other interaction details remain unchanged.

Project Structure
Backend

Contains:

FastAPI routes
LangGraph workflow
AI tools
Database models
API logic
Frontend

Contains:

React components
Split-screen dashboard
AI assistant UI
CRM interaction form
API integration logic
Setup Instructions
Backend Setup
Navigate to backend folder
Create virtual environment
Install dependencies
Start FastAPI server

Backend runs on:
http://127.0.0.1:8000

Frontend Setup
Navigate to frontend folder
Install dependencies
Start React development server

Frontend runs on:
http://localhost:5173

Assignment Requirements 
React frontend implementation
Split-screen layout
AI assistant-controlled form
No manual form filling
LangGraph integration
Minimum 5 AI tools implemented
Natural language interaction logging
AI-based edit/update workflow
Future Improvements
Streaming AI responses
Voice-based interaction logging
CRM analytics dashboard
Authentication system
Interaction history timeline
Export to external CRM 

Author
Sumit Yadav
AI-first CRM interaction system built as a technical assessment project using React, FastAPI, LangGraph, and LLM orchestration.
