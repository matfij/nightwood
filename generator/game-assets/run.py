import argparse

parser = argparse.ArgumentParser()
parser.add_argument('mode', type=int)

args = parser.parse_args()
mode = args.mode

# resie
if mode == 1:
    from src.resize import resize
    resize()

# redraw
elif mode == 2:
    from src.redraw import redraw
    redraw()

# generate dragon assets
elif mode == 3:
    from src.gen_dragons import gen_dragons
    gen_dragons()
