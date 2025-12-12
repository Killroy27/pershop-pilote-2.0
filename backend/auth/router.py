from fastapi import APIRouter, HTTPException, status
from backend.auth.models import UserCreate, UserLogin, Token, User
from backend.auth.security import hash_password, verify_password, create_access_token
import json
import os
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

USERS_DB_PATH = "data/users_db.json"

def load_users():
    """Load users from JSON file"""
    if not os.path.exists(USERS_DB_PATH):
        return []
    with open(USERS_DB_PATH, 'r') as f:
        return json.load(f)

def save_users(users):
    """Save users to JSON file"""
    with open(USERS_DB_PATH, 'w') as f:
        json.dump(users, f, indent=2)

@router.post("/signup", response_model=Token)
async def signup(user_data: UserCreate):
    """Create a new user account"""
    users = load_users()
    
    # Check if email already exists
    if any(u['email'] == user_data.email for u in users):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    new_user = {
        "id": str(uuid.uuid4()),
        "email": user_data.email,
        "full_name": user_data.full_name,
        "password_hash": hash_password(user_data.password),
        "created_at": datetime.utcnow().isoformat()
    }
    
    users.append(new_user)
    save_users(users)
    
    # Create access token
    access_token = create_access_token(data={"sub": new_user["email"], "user_id": new_user["id"]})
    
    # Return token and user data (without password)
    user_response = User(
        id=new_user["id"],
        email=new_user["email"],
        full_name=new_user["full_name"],
        created_at=new_user["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Login with email and password"""
    users = load_users()
    
    # Find user by email
    user = next((u for u in users if u['email'] == credentials.email), None)
    
    if not user or not verify_password(credentials.password, user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user["email"], "user_id": user["id"]})
    
    # Return token and user data
    user_response = User(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        created_at=user["created_at"]
    )
    
    return Token(access_token=access_token, user=user_response)

@router.get("/me", response_model=User)
async def get_current_user(token: str):
    """Get current user from token"""
    from backend.auth.security import verify_token
    
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    users = load_users()
    user = next((u for u in users if u['id'] == payload.get("user_id")), None)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return User(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        created_at=user["created_at"]
    )
