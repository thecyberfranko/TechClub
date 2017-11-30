import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

public class DecryptFile
{

    private static byte[][] readInFile(File inputFile) throws Exception
    {
        ObjectInputStream objectReadFile = new ObjectInputStream(
            new FileInputStream(inputFile));
        byte[][] encryptedList = (byte[][]) objectReadFile.readObject();
        objectReadFile.close();
        return encryptedList;
    }

    public static String[] decrypt(File inputFile, String Key) throws Exception
    {
        byte[][] encryptedList = readInFile(inputFile);
        final int Size = encryptedList.length; 
        AESencryption decrypter = new AESencryption(Key);
        String[] decryptedList = new String[Size];
        for (int i = 0; i < Size; ++i) {
            decryptedList[i] = decrypter.decryptMsg(encryptedList[i]);
        }
        return decryptedList;
    }

    public static void display(File inputFile, String Key) throws Exception
    {
        for (String Msg: decrypt(inputFile, Key)) {
            System.out.println(Msg);
        }
    }
}
