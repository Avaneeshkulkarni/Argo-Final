# Argo-Final
# Project Setup Guide

Follow the instructions below to set up and run the project.

---

## 1. Backend Setup

### Step 1: Create `.env` file
Inside the **backend** folder, create a `.env` file and add your API key:

OPENROUTER_API = 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

### Step 2: Update main.py
In the main.py file, on line 29, declare the API key variable:
api_key = OPENROUTER_API

### Step 3: Start the Backend
Open a terminal and run the following commands:
cd backend
python main.py

## 2. Frontend Setup

Open another terminal and run the following commands:
cd frontend
npm install
npm run dev

## 3. Access the App
After running the frontend, a development link will appear in the terminal (something like):
http://localhost:5173/


## 💡The Problem

Oceanographic data, like that from the ARGO program's autonomous floats, is highly complex and stored in specialized NetCDF format. This makes it difficult for non-technical users, such as policymakers, students, and some researchers, to access, analyze, and visualize. The challenge is to create an intuitive system that democratizes access to this valuable data without requiring technical expertise or specialized tools.


## 🚀 Our Solution: FloatChat
We built an AI-powered system called FloatChat that simplifies complex ocean data from ARGO floats, making it accessible to everyone. It's the first of its kind, combining a 
chatbot and a dashboard specifically for ARGO ocean data.

The system features:

1] **Natural Language Interface**: Our AI Engine, powered by GPT, understands plain English queries like "Show me salinity near the equator in March 2023" and translates them into actionable insights.

2] **Intelligent Data Pipeline**:  We process raw float data using Python and xarray, then organize it into a structured PostgreSQL database for quick analysis.

3] **Interactive Dashboard**: The user interface, built with Streamlit and Plotly, offers 3D maps and interactive charts that visualize float locations, movements, and key parameters in real-time.

4] **Robust Backend**: A fast FastAPI backend connects all the components, and Docker ensures the entire system is portable and easy to deploy.

This solution turns complex ocean data into a user-friendly, interactive experience, empowering researchers, policymakers, and students without a technical background.


## 🛠️ Technical Approach
Our system is an end-to-end pipeline that processes 

ARGO NetCDF data and stores it in both a relational and a vector database. It uses a 

Retrieval-Augmented Generation (RAG) pipeline powered by an LLM to interpret user queries and translate them into database queries.

Workflow

1] **Data Gathering**: We collect data from NetCDF files and the Argovis API.

2] **Data Cleaning and Storage**: The data is cleaned and stored in PostgreSQL (relational database) and FAISS (vector database) using Xarray and Pandas.

3] **Ingestion Engine**: This component prepares the data for the user interfaces.

4] **Chatbot Interface & Dashboard**: Users interact through a chatbot for queries or a dashboard for an overview.

5] **LLM Model**: The LLM translates natural language queries into database actions and performs vector searches.

6] **Output**: The system provides a chatbot response with salinity profiles or visualizations like 3D and 2D maps.


## Tech Stack 👨‍💻

Core Language: Python 

* **Data Processing**: Xarray (for NetCDF files) and Pandas 

* **Databases**: PostgreSQL (relational) and FAISS (vector database for semantic search) 

* **LLM**: Grok, which converts plain English queries into database actions 

* **Backend**: FastAPI and Express + Typescript 

* **Frontend**: Typescript and Streamlit (for interactive dashboards) 

* **Visualization**: Plotly (for maps, profiles, and time-series data) 

* **Containerization**: Docker (for portability)
  

## 🌱 Feasibility and Viability
Our solution is highly feasible and viable because:

1] **Reliable Data Source**: We use Argo GDACs/ERDDAP, which are trusted, open, and provide long-term data availability.

2] **Technology Ready**: We leverage mature AI (NLP), data processing tools (xarray, argopy), and visualization libraries that are ready for use.

3] **Cost-Efficient**: The system uses open-source libraries and cloud infrastructure, which results in low development and maintenance costs.

4] **Easy Adoption**: The simple chatbot interface eliminates the need for coding or specific domain knowledge, making it accessible to a wide range of users.


## 🌍 Impact & Benefits
FloatChat has a significant impact by:

1] **Democratizing Ocean Data**: It makes ARGO NetCDF datasets accessible to scientists, policymakers, and educators through simple English queries.

2] **Interactive Exploration**: The dashboards with maps, depth-time plots, and profile comparisons make data analysis intuitive and visual.

3] **Scalability**: The modular design allows us to extend the system beyond ARGO to other datasets like BGC floats, gliders, buoys, and satellite data, providing a comprehensive ocean monitoring tool. It can also handle large datasets and multiple users via cloud infrastructure.


## 🤝 Future Scope
We plan to continue developing FloatChat by:

1] Adding new ocean variables (e.g., oxygen, pH, and currents) and integrating more datasets beyond ARGO.

2] Expanding the system to support queries from any ocean region for global data exploration.

3] Fostering a community for collaborative growth by enabling users to share queries and visualizations.

