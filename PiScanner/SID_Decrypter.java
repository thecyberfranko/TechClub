import java.io.File;
import java.util.Scanner;

public class SID_Decrypter
{
    public static void main(String[] args) throws Exception
    {
        File tokenFile;
        Scanner keyboard = new Scanner(System.in);
        System.out.println("Please enter the access key");
        String accessKey = keyboard.nextLine();
        try {
            tokenFile = new File(
                TokenFile.getRoot(accessKey), "club.dat");
        }
        catch (TokenFile.NoToken e) {
            System.out.println("\nCould not find a file associated with the given access key.\n");
            throw e;
        }
        DecryptFile.display(tokenFile, accessKey);
    }
}
