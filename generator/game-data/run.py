from src.dragon_service import DragonService

# .venv\scripts\activate

MIN_LEVEL = 1
MAX_LEVEL = 90

for ind in range(150):
    DragonService.create_dragon(MIN_LEVEL, MAX_LEVEL)
