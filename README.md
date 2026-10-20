# PhreshPhish — URL Phishing Detection

PhreshPhish is a machine-learning-based web application that analyzes URL structure to estimate phishing risk. It provides a verdict, risk score, model confidence, and an explanation to help users make more informed decisions before opening a link.

**Live Demo:** https://phreshphish-frontend.onrender.com

**Backend API:** https://phreshphish.onrender.com

## Features

- URL-based phishing risk analysis using a trained machine learning classifier.
- Risk verdict, model risk score, and confidence display.
- URL structure preview, including host labels, path length, query parameters, and IP-address-host detection.
- FastAPI backend with health-check and prediction endpoints.
- React and TypeScript frontend with a responsive interface.
- Safety guidance explaining the limitations of URL-only analysis.

## Architecture

```text
User
  |
  v
React + TypeScript Frontend
  |
  | HTTP requests
  v
FastAPI Backend
  |
  v
Trained URL Classifier
  |
  v
Prediction Response
  |
  v
Verdict, Risk Score,
Confidence and Explanation
```

The frontend and backend are deployed separately on Render. The frontend communicates with the backend through its HTTP API.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Pydantic
- **Machine Learning:** Trained URL classifier
- **Deployment:** Render
- **Version Control:** Git and GitHub

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome message and endpoint information |
| GET | `/health` | Checks API and model availability |
| POST | `/predict` | Analyzes a submitted URL |

### Example Prediction Request

```json
{
  "url": "https://example.com"
}
```

The prediction endpoint returns a structured analysis containing fields such as the verdict, risk score, confidence, evidence, and explanation.

For the full interactive API documentation, visit:

https://phreshphish.onrender.com/docs

## Run the Frontend Locally

### Prerequisites

- Node.js and npm
- Git
- Access to the deployed backend or a locally running backend

### Installation

```bash
git clone https://github.com/Avanijain09/phreshphish-frontend.git
cd phreshphish-frontend
npm install
```

Create a `.env` file in the frontend root directory if you want to override the default backend URL:

```env
VITE_API_BASE_URL=https://phreshphish.onrender.com
```

The frontend already defaults to the deployed API URL when this variable is not set.

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

Build the frontend for production:

```bash
npm run build
```

## Running the Backend

The backend is maintained separately from the frontend.

1. Clone the backend repository.
2. Install the dependencies specified by that repository.
3. Configure any required model or environment files.
4. Start the FastAPI application using the backend project's configured run command.
5. Verify `/health` and test `/predict` using the interactive API documentation.

The backend repository URL and its exact installation commands should be added here once confirmed.

## Screenshots

Add screenshots of the deployed application to a `docs/screenshots/` directory and link them here.

Suggested screenshots:
- Main URL scanning interface
- Prediction result with verdict and risk score
- API documentation at `/docs`

## Limitations

- The application analyzes URL structure; it does not visit the website or inspect its live content.
- A benign verdict is not a guarantee that a website is safe.
- The risk score is a model output, not a calibrated probability of maliciousness.
- Evidence currently includes a generic classifier-based explanation when no configured URL heuristic is triggered.
- Comprehensive model evaluation, including precision, recall, F1-score, and confusion-matrix analysis, remains future work.

## Future Improvements

- Evaluate the model on a held-out test dataset.
- Report precision, recall, F1-score, and confusion matrix.
- Improve evidence using meaningful URL features and explainability methods.
- Validate risk thresholds and score calibration.
- Add automated tests and continuous integration.

## Disclaimer

PhreshPhish is a research prototype intended to support phishing awareness. Do not use its predictions as the sole basis for deciding whether a URL is safe.

## License

A license has not yet been specified. Add an appropriate license before distributing the project for reuse.
