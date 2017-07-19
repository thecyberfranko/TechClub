import java.security.*;

public class HashPassword {

    public static String toStringHash(String Input) throws Exception
    {
        byte[] hashVal = toHash(Input);
        return javax.xml.bind.DatatypeConverter.printHexBinary(hashVal);
    }

    public static byte[] toHash(String Input) throws Exception
    {
        byte[] inputText = Input.getBytes("UTF8");
        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        messageDigest.update(inputText);
        return messageDigest.digest();
        
    }

    public static boolean hashCheck(String Input, String Password) throws Exception
    {
        return Input.equals(toStringHash(Password));
    }

    public static void main (String[] args) throws Exception
    {
        if (args.length == 0) {
            System.out.println("Please, run with an argument.");
        }
        else {
            // Uncomment next line to output argument hash string.
            System.out.println(toStringHash(args[0]));
            // System.out.printf("Input %smatches.",
                // hashCheck(args[0], "Jonathan Niehenke") ? "" : "does not ");
        }
    }
}

