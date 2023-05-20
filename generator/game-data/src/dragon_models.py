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
    'Power',
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
    { 'uid': 'dodge', 'level': 60 },
    { 'uid': 'lethalBlow', 'level': 60 },
    { 'uid': 'lethalBlow', 'level': 60 },
]

FIRE_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'fireBreath', 'level': 10 },
    { 'uid': 'fireBolt', 'level': 30 },
    { 'uid': 'inferialBlessing', 'level': 30 },
]

WATER_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'soundBody', 'level': 10 },
    { 'uid': 'iceBolt', 'level': 30 },
    { 'uid': 'freeze', 'level': 60 },
]

WIND_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'pugnaciousStrike', 'level': 10 },
    { 'uid': 'airVector', 'level': 30 },
    { 'uid': 'zeal', 'level': 60 },
]

EARTH_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'roughSkin', 'level': 10 },
    { 'uid': 'rockBlast', 'level': 30 },
    { 'uid': 'deepWounds', 'level': 60 },
]

ELECTRIC_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'staticStrike', 'level': 10 },
    { 'uid': 'thunderbolt', 'level': 30 },
    { 'uid': 'superCharge', 'level': 30 },
]

NATURE_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'leafCut', 'level': 10 },
    { 'uid': 'criticalDrain', 'level': 30 },
    { 'uid': 'enchantedBarrier', 'level': 60 },
]

DARK_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'poison', 'level': 10 },
    { 'uid': 'lifeLink', 'level': 30 },
    { 'uid': 'terribleOmen', 'level': 60 },
]

POWER_SKILLS = [
    *COMMON_SKILLS,
    { 'uid': 'veritableStrike', 'level': 10 },
    { 'uid': 'woundedPride', 'level': 30 },
    { 'uid': 'prominenceBlast', 'level': 60 },
]
