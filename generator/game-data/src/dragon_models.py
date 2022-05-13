DRAGON_ATTRIBUTES = [
    'strength',
    'dexterity',
    'endurance',
    'will',
    'luck',
]

DRAGON_NATURE = [
    'Fire',
    'Water',
    'Wind',
    'Earth',
    'Electric',
    'Nature',
    'Dark',
]

COMMON_SKILLS = [
    { 'uid': 'innerFlow', 'level': 1 },
    { 'uid': 'innateSpeed', 'level': 1 },
    { 'uid': 'luckyStrike', 'level': 1 },
    { 'uid': 'greatVigor', 'level': 1 },
    { 'uid': 'thoughtfulStrike', 'level': 10 },
    { 'uid': 'beginnersLuck', 'level': 10 },
    { 'uid': 'magicArrow', 'level': 10 },
    { 'uid': 'block', 'level': 30 },
    { 'uid': 'armorPenetration', 'level': 30 },
    { 'uid': 'rage', 'level': 30 },
]

FIRE_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'fireBreath', 'level': 10 },
    { 'uid': 'fireBolt', 'level': 30 },
]

WATER_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'soundBody', 'level': 10 },
    { 'uid': 'iceBolt', 'level': 30 },
]

WIND_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'pugnaciousStrike', 'level': 10 },
    { 'uid': 'airVector', 'level': 30 },
]

EARTH_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'roughSkin', 'level': 10 },
    { 'uid': 'rockBlast', 'level': 30 },
]

ELECTRIC_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'staticStrike', 'level': 10 },
    { 'uid': 'thunderbolt', 'level': 30 },
]

NATURE_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'leafCut', 'level': 10 },
    { 'uid': 'criticalDrain', 'level': 30 },
]

DARK_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'poison', 'level': 10 },
    { 'uid': 'lifeLink', 'level': 30 },
]
