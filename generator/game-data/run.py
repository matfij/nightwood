from dotenv import load_dotenv
load_dotenv()

from src.dragon_data import DRAGON_BLUEPRINTS
from src.dragon_service import DragonService

# .venv\Scripts\activate

for dragon in DRAGON_BLUEPRINTS:
    DragonService.create_dragon(dragon)
