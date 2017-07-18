import matplotlib.pyplot as plt
import numpy as np
import time
import os

from PIL import Image

np.set_printoptions(precision=1, linewidth=160)
img = Image.open("SoccerBall_verySmall.png")
imggray = img.convert("LA")
imgmat = np.array(list(imggray.getdata(band=0)), float)
imgmat.shape = (imggray.size[1], imggray.size[0])
imgmat = np.matrix(imgmat)
plt.imshow(imgmat, cmap='gray');
print("Original: 100 Values\n", imgmat, end="\n\n")
plt.show();
U, sigma, V = np.linalg.svd(imgmat)
for i in range(1, 8, 2):
    print("U: \n", U[:, :i] * np.diag(sigma[:i]), end="\n\n")
    print("V: \n", V[:i, :], end="\n\n")
    reconstimg = np.matrix(U[:, :i]) * np.diag(sigma[:i]) * np.matrix(V[:i, :])
    size = 20 * i;
    print("Reconstructed {} Values: \n".format(size), reconstimg, end="\n\n")
    plt.imshow(reconstimg, cmap='gray');
    plt.show()
    os.system('cls')
    print("Original: \n", imgmat, end="\n\n")
print("SoccerBall:", 560 ** 2, " Values")
print("Compressed:", 560 ** 2 / (560 * 2), "Singular Values")
plt.imshow(imgmat, cmap='gray');
plt.show();
os.system('cls')
