import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.IOException;

public class EncryptList
{

    private static void writeToFile(
        File outputFile, byte[][] encryptedList) throws IOException
    {
        ObjectOutputStream objectWriteFile = new ObjectOutputStream(
            new FileOutputStream(outputFile));
        objectWriteFile.writeObject(encryptedList);
        objectWriteFile.close();
    }

    public static byte[][] Encrypt(
        String Key, String[] SID_List) throws Exception
    {
        final int Size = SID_List.length;
        AESencryption encrypter = new AESencryption(Key);
        byte[][] encryptedList = new byte[Size][];
        for (int i = 0; i < Size; ++i) {
            encryptedList[i] = encrypter.encryptMsg(SID_List[i]);
        }
        return encryptedList;
    }

    public static void encryptToFile(
        File outputFile, String Key, String[] SID_List) throws Exception
    {
        writeToFile(outputFile, Encrypt(Key, SID_List));
    }

}
