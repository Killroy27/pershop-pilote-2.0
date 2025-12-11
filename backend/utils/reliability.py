import time
import functools
from typing import Callable, Any

def retry_with_backoff(retries: int = 3, backoff_in_seconds: int = 1):
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            x = 0
            while True:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if x == retries:
                        print(f"❌ Échec définitif après {retries} essais : {e}")
                        raise e
                    else:
                        sleep = (backoff_in_seconds * 2 ** x + 
                                 (time.time() % 1)) # Jitter léger
                        print(f"⚠️ Erreur ({e}). Nouvelle tentative dans {sleep:.1f}s...")
                        time.sleep(sleep)
                        x += 1
        return wrapper
    return decorator
