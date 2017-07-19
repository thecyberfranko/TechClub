// TO ENABLE >128 Keys download files:
// http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html
// Replace local_policy and US_export_policy in
// [JavaInstall]/jre{version}/lib/security
import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

public class AESencryption {

    final private Cipher cipher;
    final private Key key;

    public AESencryption(String keyStr) throws Exception
    {
        key = new SecretKeySpec(keyStr.getBytes(), "AES");
        cipher = Cipher.getInstance("AES");
    }

    public byte[] encryptMsg(String message) throws Exception
    {
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(message.getBytes("UTF8"));
    }

    public String decryptMsg(byte[] cipherText) throws Exception
    {
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] clearText = cipher.doFinal(cipherText);
        return new String(clearText, "UTF8");
    }

    public static void main (String[] args) throws Exception
    {
        AESencryption test = new AESencryption("JonathanNiehenke");
        if (args.length == 0) {
            System.out.println("Please, run with an argument.");
        }
        else {
            System.out.println(test.decryptMsg(test.encryptMsg(args[0])));
        }
    }
}
