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
    print('redraw')

# filter
elif mode == 3:
    from src.filter import filter
    filter()
    print('filter')
