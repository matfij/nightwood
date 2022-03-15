import numpy as np
from skimage import io

MASK_PATH = 'img/masks/'
INPUT_PATH = 'img/input/'
OUTPUT_PATH = 'img/output/'

def filter():
    img = io.imread(f'{OUTPUT_PATH}output.png')
    mask = io.imread(f'{MASK_PATH}m1.png')

    mask = np.where((mask==0), 0, 1).astype('uint8')

    img = img * mask[:, :, np.newaxis]
    io.imsave('filtered.png', img[0, :, :, :]) 
