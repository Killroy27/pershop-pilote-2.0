"""
Script to initialize the database and migrate shopper data from JSON
"""
import json
import sys
import os

# Add backend directory to path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_dir)
root_dir = os.path.dirname(backend_dir)
sys.path.insert(0, root_dir)

from backend.database import engine, Base, SessionLocal
from backend.models import User, ShopperProfile

def init_db():
    """Create all tables"""
    print("📦 Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

def migrate_shoppers():
    """Migrate shoppers from JSON to database"""
    print("\n📊 Migrating shopper data from JSON...")
    
    # Load existing shoppers
    json_path = "data/shoppers_db.json"
    if not os.path.exists(json_path):
        print(f"⚠️  No JSON file found at {json_path}")
        return
    
    with open(json_path, 'r', encoding='utf-8') as f:
        shoppers_data = json.load(f)  # Direct array
    
    db = SessionLocal()
    
    try:
        # Migrate first 20 shoppers for testing
        for idx, shopper_data in enumerate(shoppers_data[:20]):
            # Create user account for shopper
            email = f"{shopper_data['name'].lower().replace(' ', '.').replace('.', '')}@pershop.com"
            user = User(
                email=email,
                hashed_password="$2b$12$placeholder",  # Will be set during auth implementation
                role="shopper"
            )
            db.add(user)
            db.flush()  # Get the user ID
            
            # Extract location name
            location = shopper_data.get("location", {})
            location_name = location.get("name") if isinstance(location, dict) else None
            
            # Extract metrics
            metrics = shopper_data.get("metrics", {})
            
            # Create shopper profile
            shopper = ShopperProfile(
                user_id=user.id,
                name=shopper_data.get("name"),
                location=location_name,
                bio=shopper_data.get("bio"),
                avatar_url=f"https://i.pravatar.cc/150?u={idx}",  # Placeholder
                specialties=shopper_data.get("specialties", []),
                services=[{"name": spec, "price": "200€"} for spec in shopper_data.get("specialties", [])[:3]],  # Convert specialties to services
                languages=["Français", "Anglais"],  # Placeholder
                matching_profile={},  # Will be computed later
                style_signature=shopper_data.get("main_category", "Mode"),
                total_clients=metrics.get("clients_count", 0),
                satisfaction_rate=metrics.get("rating", 0.0),
                response_time="< 24h",
                is_available=True
            )
            db.add(shopper)
        
        db.commit()
        print(f"✅ Successfully migrated 20 shoppers!")
        
    except Exception as e:
        print(f"❌ Error during migration: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Initializing Pershop Database...\n")
    init_db()
    migrate_shoppers()
    print("\n✨ Database setup complete!")
