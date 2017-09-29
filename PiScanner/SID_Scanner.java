import java.util.ArrayList;
import java.io.File;
import java.util.Scanner;

public class SID_Scanner
{
    File tokenFile;
    ArrayList<String> SID_List = new ArrayList<String>();
    Scanner keyboard = new Scanner(System.in);

    private void readBarCodes()
    {
        System.out.println("Reading barcodes...");
        String inputVal;
        int i = 1;
        while (true) {
            System.out.printf("Barcode %d: ", i++);
            inputVal = keyboard.nextLine();
            if (inputVal.toUpperCase().equals("STOP"))
                break;  // Prevent Stop value from entering list.
            SID_List.add(inputVal);
        }
        System.out.println("Press Enter to continue");
        keyboard.nextLine();
    }

    public SID_Scanner() throws Exception
    {
        System.out.println("Please enter the access key");
        String accessKey = keyboard.nextLine();
        try {
            tokenFile = new File(
                TokenFile.getRoot(accessKey), "test.dat");
        }
        catch (TokenFile.NoToken e) {
            System.out.println("Could not find authenticating token.");
            throw e;
        }
        readBarCodes();
        System.out.println("Encrypt to file");
        EncryptList.encryptToFile(
            tokenFile, accessKey, SID_List.toArray(new String[0]));
    }

    public static void main(String[] args) throws Exception
    {
        SID_Scanner Instance = new SID_Scanner();
    }
}
