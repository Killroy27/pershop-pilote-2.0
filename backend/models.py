from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # "client" or "shopper"
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    client_profile = relationship("ClientProfile", back_populates="user", uselist=False)
    shopper_profile = relationship("ShopperProfile", back_populates="user", uselist=False)


class ClientProfile(Base):
    __tablename__ = "client_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Personal Info
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    city = Column(String)
    date_of_birth = Column(String)
    
    # Morphology / Style
    morphology_type = Column(String)
    preferred_brands = Column(JSON)  # List of brands
    style_preferences = Column(JSON)  # Style tags
    
    # Analysis History
    last_analysis = Column(JSON)  # Last Mirror + Context analysis
    loyalty_points = Column(Integer, default=0)
    
    # Relationship
    user = relationship("User", back_populates="client_profile")
    bookings = relationship("Booking", back_populates="client")
    

class ShopperProfile(Base):
    __tablename__ = "shopper_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    # Personal Info
    name = Column(String, nullable=False)
    location = Column(String)
    bio = Column(Text)
    avatar_url = Column(String)
    
    # Professional Info
    specialties = Column(JSON)  # List of specialties
    services = Column(JSON)  # List of services with prices
    languages = Column(JSON)  # Languages spoken
    
    # Matching Profile
    matching_profile = Column(JSON)  # Radar chart data
    style_signature = Column(String)
    
    # Stats
    total_clients = Column(Integer, default=0)
    satisfaction_rate = Column(Float, default=0.0)
    response_time = Column(String)
    
    # Availability
    is_available = Column(Boolean, default=True)
    
    # Relationship
    user = relationship("User", back_populates="shopper_profile")
    bookings = relationship("Booking", back_populates="shopper")


class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("client_profiles.id"))
    shopper_id = Column(Integer, ForeignKey("shopper_profiles.id"))
    
    # Booking Details
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    location = Column(String)
    status = Column(String, default="pending")  # pending, confirmed, completed, cancelled
    
    # Session Info
    service_type = Column(String)
    notes = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    client = relationship("ClientProfile", back_populates="bookings")
    shopper = relationship("ShopperProfile", back_populates="bookings")


class MatchingHistory(Base):
    __tablename__ = "matching_history"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("client_profiles.id"))
    shopper_id = Column(Integer, ForeignKey("shopper_profiles.id"))
    
    match_score = Column(Float)
    analysis_data = Column(JSON)  # Full analysis from Mirror + Context
    created_at = Column(DateTime, default=datetime.utcnow)
