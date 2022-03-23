import os
import json
import math
import random
from requests import post


class DragonService:

    BASE_URL = 'http://localhost:3000/api/v1'
    AUTH_TOKEN = os.getenv('GENERATOR_TOKEN')


    @classmethod
    def gen_attr(cls, power: int) -> int:
        bottom_limit = math.floor(power / 5) + 1
        top_limit = math.floor(power / 1.5) + 1
        return random.randrange(bottom_limit, top_limit)


    @classmethod
    def gen_skill(cls, power: int) -> int:
        bottom_limit = min(math.floor(power / 8), 20)
        top_limit = min(math.floor(power / 3) + 1, 25)
        return random.randrange(bottom_limit, top_limit)


    @classmethod
    def create_dragon(cls, dragon: dict) -> None:
        url = f'{cls.BASE_URL}/dragon/create'

        dragon = json.dumps({
            'name': dragon['name'],
            'nature': dragon['nature'],
            'level': dragon['level'],
            'strength': cls.gen_attr(dragon['power_level']),
            'dexterity': cls.gen_attr(dragon['power_level']),
            'endurance': cls.gen_attr(dragon['power_level']),
            'will': cls.gen_attr(dragon['power_level']),
            'luck': cls.gen_attr(dragon['power_level']),
            'skills': {
                'innateSpeed': cls.gen_skill(dragon['power_level']),
                'innerFlow': cls.gen_skill(dragon['power_level']),
                'luckyStrike': cls.gen_skill(dragon['power_level']),
                'greatVigor': cls.gen_skill(dragon['power_level']),
                'thoughtfulStrike': cls.gen_skill(dragon['power_level']),
                'fireBreath': cls.gen_skill(dragon['power_level']) if dragon['nature'] == 'Fire' else 0,
                'soundBody': cls.gen_skill(dragon['power_level']) if dragon['nature'] == 'Water' else 0,
                'pugnaciousStrike': cls.gen_skill(dragon['power_level']) if dragon['nature'] == 'Wind' else 0,
                'roughSkin': cls.gen_skill(dragon['power_level']) if dragon['nature'] == 'Earth' else 0,
            }
        })

        headers = { 
            'Authorization': cls.AUTH_TOKEN,
            'Content-Type': 'application/json',
        }

        res = post(url, dragon, headers=headers)
