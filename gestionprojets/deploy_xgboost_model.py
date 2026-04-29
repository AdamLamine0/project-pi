#!/usr/bin/env python3
"""
XGBoost Model Deployment Script
Copies the trained model pickle files to the correct location for the ML service.

Usage:
    python deploy_xgboost_model.py
"""

import shutil
import sys
from pathlib import Path


def main():
    """Deploy XGBoost model files to the ML service"""
    
    # Define paths
    project_root = Path(__file__).parent
    models_dir = project_root / "ml-service" / "app" / "scoring" / "models"
    
    # Model files to deploy
    required_files = {
        "startup_maturity_model.pkl": "XGBoost trained classifier",
        "label_encoder.pkl": "Label encoder (optional)",
        "features.pkl": "Features encoder (optional)"
    }
    
    print("=" * 60)
    print("XGBoost Model Deployment")
    print("=" * 60)
    
    # Create models directory if it doesn't exist
    models_dir.mkdir(parents=True, exist_ok=True)
    print(f"\n✓ Models directory ready: {models_dir}")
    
    # Look for model files in project root
    print("\nLooking for model files in project root...")
    found_files = {}
    
    for filename in required_files:
        src_file = project_root / filename
        if src_file.exists():
            found_files[filename] = src_file
            print(f"✓ Found: {filename}")
        else:
            print(f"✗ Not found: {filename}")
    
    # Copy found files to models directory
    if found_files:
        print(f"\nCopying files to {models_dir}...")
        for filename, src_path in found_files.items():
            dst_path = models_dir / filename
            try:
                shutil.copy2(src_path, dst_path)
                file_size = dst_path.stat().st_size / (1024 * 1024)  # Convert to MB
                print(f"✓ Deployed: {filename} ({file_size:.2f} MB)")
            except Exception as e:
                print(f"✗ Failed to copy {filename}: {e}")
                return 1
    else:
        print("\n⚠ No model files found in project root!")
        print("\nPlease ensure these files are in the project root directory:")
        for filename, description in required_files.items():
            print(f"  - {filename} ({description})")
        return 1
    
    # Verify deployment
    print("\nVerifying deployment...")
    deployed = list(models_dir.glob("*.pkl"))
    print(f"✓ Found {len(deployed)} model files in {models_dir}")
    
    for pkl_file in deployed:
        size = pkl_file.stat().st_size / (1024 * 1024)
        print(f"  ✓ {pkl_file.name} ({size:.2f} MB)")
    
    print("\n" + "=" * 60)
    print("Deployment Complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Restart the ML service (inside gestionprojets):")
    print("   cd gestionprojets/ml-service")
    print("   python -m uvicorn app.main:app --reload --port 8001")
    print("\n2. Test the scoring endpoint:")
    print("   curl -X POST http://localhost:8001/api/ml/score ...")
    print("\n3. Verify model loaded in logs:")
    print("   grep 'model' logs/ml-service.log")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
