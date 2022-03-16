import PIL
import numpy as np
import tensorflow as tf

def load_image(path):
  img = tf.io.decode_image(tf.io.read_file(path), channels=3, dtype=tf.float32)[tf.newaxis, ...]
  return img

def export_image(tf_img):
  tf_img = tf_img*255
  tf_img = np.array(tf_img, dtype=np.uint8)

  if np.ndim(tf_img) > 3:
    assert tf_img.shape[0] == 1
    img = tf_img[0]

  return PIL.Image.fromarray(img)
