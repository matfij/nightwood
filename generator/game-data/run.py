from dotenv import load_dotenv
load_dotenv()

from src.dragon_data import DRAGON_BLUEPRINTS_1, DRAGON_BLUEPRINTS_2, DRAGON_BLUEPRINTS_3
from src.dragon_service import DragonService

# .venv\Scripts\activate

# for dragon in DRAGON_BLUEPRINTS_2:
#     DragonService.create_dragon(dragon)

for dragon in DRAGON_BLUEPRINTS_3:
    DragonService.create_full_dragon(dragon)
