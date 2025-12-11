import math

class GeoLocator:
    def __init__(self):
        # Base de données simple pour le pilote
        # Dans la V3, on appellera une API style Mapbox/Google Maps
        self.city_db = {
            "paris": {"lat": 48.8566, "lon": 2.3522},
            "lyon": {"lat": 45.7640, "lon": 4.8357},
            "marseille": {"lat": 43.2965, "lon": 5.3698},
            "bordeaux": {"lat": 44.8378, "lon": -0.5792},
            "lille": {"lat": 50.6292, "lon": 3.0573},
            "levallois": {"lat": 48.8932, "lon": 2.2879}, # Test Case Proximity
            "neuilly": {"lat": 48.8846, "lon": 2.2688},
            "boulogne": {"lat": 48.8397, "lon": 2.2426}
        }

    def get_coordinates(self, city_name: str):
        """Retourne les coords d'une ville (normalisée)"""
        if not city_name:
            return None
            
        clean_name = city_name.lower().strip()
        
        # Recherche exacte
        if clean_name in self.city_db:
            return self.city_db[clean_name]
            
        # Recherche partielle (ex: "paris 17e" -> "paris")
        for key in self.city_db:
            if key in clean_name:
                return self.city_db[key]
                
        return None

    def calculate_distance(self, lat1, lon1, lat2, lon2):
        """Formule de Haversine pour calculer la distance en km"""
        R = 6371  # Rayon Terre en km

        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        
        a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) * math.sin(dlon / 2))
             
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = R * c
        
        return round(distance, 1)

    def is_nearby(self, client_city, shopper_location, threshold_km=30):
        """Vérifie si un shopper est proche"""
        client_coords = self.get_coordinates(client_city)
        if not client_coords:
            return False # On ne sait pas, donc on ne filtre pas (ou on pénalise, au choix)
            
        # shopper_location est un dict {lat, lon} venant de la DB shoppeur
        dist = self.calculate_distance(
            client_coords['lat'], client_coords['lon'],
            shopper_location['lat'], shopper_location['lon']
        )
        
        return dist <= threshold_km, dist
