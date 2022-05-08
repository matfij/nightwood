import cv2
import tensorflow as tf
import tensorflow_hub as tf_hub
from src.utils.tf_utils import load_image, export_image

MASK_PATH = 'img/masks/'
PATTERN_PATH = 'img/patterns/'
INPUT_PATH = 'img/input/'
OUTPUT_PATH = 'img/output/'

pattern = 'p-3'
dragons = ['d-1-1', 'd-1-2', 'd-1-3', 'd-1-4']
masks = ['m-1-1', 'm-1-2', 'm-1-3', 'm-1-4']

def gen_dragons():

    tf_model = tf_hub.load('models/aim')
    tf_pattern = load_image(f'{INPUT_PATH}{pattern}.jpg')

    for dragon, mask in zip (dragons, masks):

        # apply pattern
        tf_image = load_image(f'{PATTERN_PATH}{dragon}.png')

        tf_result = tf_model(tf.constant(tf_image), tf.constant(tf_pattern))[0]

        export_image(tf_result).save(f'{OUTPUT_PATH}{dragon}.png')

        # apply mask
        image = cv2.imread(f'{OUTPUT_PATH}{dragon}.png', cv2.IMREAD_UNCHANGED)
        mask = cv2.imread(f'{MASK_PATH}{mask}.png')

        mask = cv2.bitwise_not(mask)

        img = cv2.bitwise_and(image, image, mask=mask[:, :, 1])

        cv2.imwrite(f'{OUTPUT_PATH}{dragon}.png', img)
