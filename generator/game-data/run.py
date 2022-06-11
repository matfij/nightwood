from src.dragon_service import DragonService

# .venv\scripts\activate

MIN_LEVEL = 60
MAX_LEVEL = 120

for ind in range(120):
    DragonService.create_dragon(MIN_LEVEL, MAX_LEVEL)
