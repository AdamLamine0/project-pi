#!/usr/bin/env python3
"""
Setup script to copy trained XGBoost model files to the scoring models directory.
Run this after placing the pickle files in a source location.
"""

import shutil
import sys
from pathlib import Path

def setup_models(source_dir: str = None):
    """Copy model files from source directory to models directory"""
    
    models_dir = Path(__file__).parent / "models"
    models_dir.mkdir(exist_ok=True)
    
    # If source not provided, look in common locations
    if source_dir is None:
        source_dir = Path(__file__).parent.parent.parent.parent  # project root
    
    source_path = Path(source_dir)
    
    required_files = {
        "startup_maturity_model.pkl": "XGBoost trained model",
        "label_encoder.pkl": "Label encoder (optional)",
        "features.pkl": "Features encoder (optional)"
    }
    
    print(f"Looking for model files in: {source_path}")
    
    for filename, description in required_files.items():
        src_file = source_path / filename
        dst_file = models_dir / filename
        
        if src_file.exists():
            try:
                shutil.copy2(src_file, dst_file)
                print(f"✓ Copied {filename} ({description})")
            except Exception as e:
                print(f"✗ Failed to copy {filename}: {e}")
        else:
            print(f"? Not found: {filename} ({description})")
    
    print(f"\nModel files location: {models_dir}")
    print("Setup complete!")

if __name__ == "__main__":
    source = sys.argv[1] if len(sys.argv) > 1 else None
    setup_models(source)
