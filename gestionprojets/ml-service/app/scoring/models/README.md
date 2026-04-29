# XGBoost Maturity Scoring Models

This directory contains the trained XGBoost model files for startup maturity scoring.

## Required Files

Place the following pickle files in this directory:

1. **startup_maturity_model.pkl** - The trained XGBoost classifier model
   - Expected input features: [mvp, users, growth_rate, revenue, team_size, funding, retention_rate, market_score, fraud_flag]
   - Output: Multi-class predictions (0=early, 1=needs-work, 2=promising, 3=strong)

2. **label_encoder.pkl** - Label encoder for class labels (optional)
   - Used to map numerical labels to readable stage names

3. **features.pkl** - Feature encoder/scaler (optional)
   - Contains feature names and any preprocessing information

## Integration

The `ScoringService` class in `scoring_service.py` will automatically load these models on initialization. If models are not found, the service falls back to a heuristic-based scoring method.

## Model Features

The trained model uses the following features:

- **mvp** (0/1): Whether a minimum viable product exists
- **users** (int): Estimated number of users
- **growth_rate** (float): Monthly growth rate (0-1)
- **revenue** (float): Current revenue in units
- **team_size** (int): Number of team members
- **funding** (float): Total funding received
- **retention_rate** (float): User retention rate (0-1)
- **market_score** (float): Market opportunity score (0-1)
- **fraud_flag** (0/1): Suspicious activity indicator

## Output

The model produces maturity scores from 0.0 to 1.0:
- **0.0 - 0.2**: Early stage (minimal signals)
- **0.2 - 0.45**: Needs work (some signals, gaps to address)
- **0.45 - 0.75**: Promising (strong fundamentals)
- **0.75 - 1.0**: Strong (market-ready)
