import matplotlib.pyplot as plt
import numpy as np
import time
import os

from PIL import Image

np.set_printoptions(precision=1, linewidth=160)

def numericExample():
    with Image.open("SoccerBall_verySmall.png") as Img:
        imgGray = Img.convert("LA")
        imgMatrix = np.array(list(imgGray.getdata(band=0)), float)
        imgMatrix.shape = (imgGray.size[1], imgGray.size[0])
        imgMatrix = np.matrix(imgMatrix)
        plt.imshow(imgMatrix, cmap='gray');
        print("Original: 100 Values\n", imgMatrix, end="\n\n")
        plt.show();
        U, sigma, V = np.linalg.svd(imgMatrix)
        for i in range(1, 8, 2):
            print("U: \n", U[:, :i] * np.diag(sigma[:i]), end="\n\n")
            print("V: \n", V[:i, :], end="\n\n")
            reconstimg = np.matrix(U[:, :i]) * np.diag(sigma[:i]) * np.matrix(V[:i, :])
            size = 20 * i;
            print("Reconstructed {} Values: \n".format(size), reconstimg, end="\n\n")
            plt.imshow(reconstimg, cmap='gray');
            plt.show()
            os.system('cls')
            print("Original: \n", imgMatrix, end="\n\n")
        plt.imshow(imgMatrix, cmap='gray')
        plt.show()
        os.system('cls')

def liveSvdDemo(fileName, svdStart, svdStop, svdStep):
    # May cause MemoryError if accumulated Images are too large
    with Image.open(fileName) as Img:
        imgX, imgY = Img.size
        imgGray = Img.convert("LA")
        imgMatrix = np.array(list(imgGray.getdata(band=0)), float)
        imgMatrix.shape = (imgGray.size[1], imgGray.size[0])
        imgMatrix = np.matrix(imgMatrix)
        print("Original: {} * {} = {} Total Values".format(
                imgX, imgY, imgMatrix.size))
        plt.imshow(imgGray, cmap='gray');
        U, sigma, V = np.linalg.svd(imgMatrix)
        for i in range(svdStart, svdStop, svdStep):
            svdSize = i * (imgX + imgY)
            print("{} * {} + {} * {} = {} Total Values = {:.4f} compression".format(
                imgX, i, imgY, i, svdSize, 1 - svdSize/imgMatrix.size))
            reconstimg = np.matrix(U[:, :i]) * np.diag(sigma[:i]) * np.matrix(V[:i, :])
            plt.imshow(reconstimg, cmap='gray');
            plt.show()
        print("Presenting the grey scale original")
        plt.imshow(imgGray, cmap='gray');
        plt.show()

numericExample()
liveSvdDemo("skyline.png", 1, 302, 40)
