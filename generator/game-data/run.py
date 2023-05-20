from src.dragon_service import DragonService

# .venv\scripts\activate

MIN_LEVEL = 200
MAX_LEVEL = 300

for ind in range(40):
    DragonService.create_dragon(MIN_LEVEL, MAX_LEVEL)
