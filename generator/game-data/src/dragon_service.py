import os
import math
import random
import json
from requests import post
from dotenv import load_dotenv
from src.dragon_names import DRAGON_NAMES
from src.dragon_models import * 


load_dotenv()


class DragonService:

    BASE_URL = os.getenv('BASE_URL')
    AUTH_TOKEN = os.getenv('GENERATOR_TOKEN')


    @classmethod
    def create_dragon(cls, min_level, max_level):
        name = cls.gen_random_name()
        level = random.randint(min_level, max_level)
        nature = random.choice(DRAGON_NATURE)
        attribures = cls.gen_attributes(level)
        skills = cls.gen_skills(level, nature)

        dragon = {
            'name': name,
            'level': level,
            'nature': nature,
            **attribures,
            'skills': skills
        }

        url = f'{cls.BASE_URL}/dragon/create'
        headers = { 
            'Authorization': cls.AUTH_TOKEN,
            'Content-Type': 'application/json',
        }
        res = post(url, json.dumps(dragon), headers=headers)
        print(res)


    @classmethod
    def gen_random_name(cls):
        return random.choice(DRAGON_NAMES)


    @classmethod
    def gen_attributes(cls, level):
        attribute_pool = 5 + random.randint(math.floor(0.9 * level), math.floor(1.9 * level))

        strength = 0
        dexterity = 0
        endurance = 0
        will = 0
        luck = 0

        while attribute_pool > 0:
            if random.random() > 0.30: 
                strength += 1
                attribute_pool -= 1
            if random.random() > 0.31: 
                dexterity += 1
                attribute_pool -= 1
            if random.random() > 0.32: 
                endurance += 1
                attribute_pool -= 1
            if random.random() > 0.33: 
                will += 1
                attribute_pool -= 1
            if random.random() > 0.34: 
                luck += 1
                attribute_pool -= 1

        return { 'strength': strength, 'dexterity': dexterity, 'endurance': endurance, 'will': will, 'luck': luck }


    @classmethod
    def gen_skills(cls, level, nature):
        skill_pool = 1 + random.randint(math.floor(1.1 * level), math.floor(2.9 * level))

        skills = {}
        if nature == 'Fire':
            available_skills = FIRE_SKILLS
        elif nature == 'Water':
            available_skills = WATER_SKILLS
        elif nature == 'Wind':
            available_skills = WIND_SKILLS
        elif nature == 'Earth':
            available_skills = EARTH_SKILLS
        elif nature == 'Electric':
            available_skills = ELECTRIC_SKILLS
        elif nature == 'Nature':
            available_skills = NATURE_SKILLS
        elif nature == 'Dark':
            available_skills = DARK_SKILLS

        while skill_pool > 0:
            for skill in available_skills[::-1]:
                if level >= skill['level'] and random.random() > 0.2:
                    if skill['uid'] not in skills:
                        skills[skill['uid']] = 1
                    else:
                        skills[skill['uid']] += 1
                    skill_pool -= 1

        return skills
