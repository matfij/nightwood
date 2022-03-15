import os
import cv2
from PIL import Image
from shutil import copy


TARGET_SIZE = 400
APPLY_FILTERS = False
RESIZE = True
INPUT_FOLDER = 'img/input/'
OUTPUT_FOLDER = 'img/output/'


def resize():
    raw_images = os.listdir(INPUT_FOLDER)

    for image in raw_images:
        if APPLY_FILTERS:
            img = cv2.imread(f'{INPUT_FOLDER}{image}', cv2.IMREAD_UNCHANGED)
            img = cv2.detailEnhance(img, sigma_s=11, sigma_r=0.11)
            cv2.imwrite(f'{OUTPUT_FOLDER}{image}', img)
        else:
            copy(f'{INPUT_FOLDER}{image}', f'{OUTPUT_FOLDER}{image}')

    if RESIZE:
        filtered_images = os.listdir(OUTPUT_FOLDER)

        for image in filtered_images:
            img = Image.open(f'{OUTPUT_FOLDER}{image}')
            wpercent = (TARGET_SIZE / float(img.size[0]))
            hsize = int((float(img.size[1]) * float(wpercent)))
            img = img.resize((TARGET_SIZE, hsize), Image.ANTIALIAS)
            img.save(f'{OUTPUT_FOLDER}{image}')
