import PIL
import numpy as np
import tensorflow as tf
import tensorflow_hub as tf_hub


INPUT_PATH = 'img/input'
OUTPUT_PATH = 'img/input'


def load_image(image_path, image_size=(512, 256)):
  img = tf.io.decode_image(
    tf.io.read_file(image_path),
    channels=3, dtype=tf.float32)[tf.newaxis, ...]
  # img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
  return img


def export_image(tf_img):
  tf_img = tf_img*255
  tf_img = np.array(tf_img, dtype=np.uint8)
  if np.ndim(tf_img) > 3:
    assert tf_img.shape[0] == 1
    img = tf_img[0]
  return PIL.Image.fromarray(img)


def redraw():
  original_image = load_image(f'{INPUT_PATH}base0.png')
  style_image = load_image(f'{INPUT_PATH}base0.png')

  style_image = tf.nn.avg_pool(style_image, ksize=[3,3], strides=[1,1], padding='VALID')

  stylize_model = tf_hub.load('models/aim')

  results = stylize_model(tf.constant(original_image), tf.constant(style_image))
  stylized_photo = results[0]

  export_image(stylized_photo).save(f'{OUTPUT_PATH}output.png')
