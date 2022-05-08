import argparse

# .venv\scripts\activate

parser = argparse.ArgumentParser()
parser.add_argument('mode', type=int)

args = parser.parse_args()
mode = args.mode

# resie (and standarize) assets
if mode == 1:
    from src.resize import resize
    resize()

# generate dragon assets
elif mode == 2:
    from src.gen_dragons import gen_dragons
    gen_dragons()
