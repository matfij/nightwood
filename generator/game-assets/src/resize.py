import os
import cv2
from PIL import Image
from shutil import copy

TARGET_SIZE = 100
APPLY_FILTERS = False
RESIZE = True
REMOVE_BG = False
ROTATE = -180

INPUT_FOLDER = 'img/to-resize/'
OUTPUT_FOLDER = 'img/output/'

def resize():
    raw_images = os.listdir(INPUT_FOLDER)

    for image in raw_images:
        if APPLY_FILTERS:
            img = cv2.imread(f'{INPUT_FOLDER}{image}', cv2.IMREAD_UNCHANGED)
            img = cv2.detailEnhance(img, sigma_s=3, sigma_r=0.03)
            # img = cv2.stylization(img, sigma_s=20, sigma_r=0.12)
            cv2.imwrite(f'{OUTPUT_FOLDER}{image}', img)
        else:
            copy(f'{INPUT_FOLDER}{image}', f'{OUTPUT_FOLDER}{image}')

    if REMOVE_BG:
        filtered_images = os.listdir(OUTPUT_FOLDER)

        for image in filtered_images:
            img = cv2.imread(f'{OUTPUT_FOLDER}{image}', cv2.IMREAD_UNCHANGED)
            tmp = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            _, alpha = cv2.threshold(tmp, 0, 255, cv2.THRESH_BINARY)
            b, g, r = cv2.split(img)
            rgba = [b, g, r, alpha]
            dst = cv2.merge(rgba, 4)
            cv2.imwrite(f'{OUTPUT_FOLDER}{image}', dst)

    if ROTATE != 0:
        filtered_images = os.listdir(OUTPUT_FOLDER)

        for image in filtered_images:
            img = Image.open(f'{OUTPUT_FOLDER}{image}')
            # img = img.rotate(ROTATE)
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
            img.save(f'{OUTPUT_FOLDER}{image}')

    if RESIZE:
        filtered_images = os.listdir(OUTPUT_FOLDER)

        for image in filtered_images:
            img = Image.open(f'{OUTPUT_FOLDER}{image}')
            wpercent = (TARGET_SIZE / float(img.size[0]))
            hsize = int((float(img.size[1]) * float(wpercent)))
            img = img.resize((TARGET_SIZE, hsize), Image.ANTIALIAS)
            img.save(f'{OUTPUT_FOLDER}{image}')
