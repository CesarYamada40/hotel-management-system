from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """
    Create and return a Supabase client instance
    """
    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_KEY
    )

def get_supabase_admin_client() -> Client:
    """
    Create and return a Supabase client instance with service role key
    """
    return create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_SERVICE_KEY
    )
