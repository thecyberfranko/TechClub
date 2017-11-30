import java.util.ArrayList;
import java.io.File;
import java.util.Scanner;

public class SID_Scanner
{
    File tokenFile;
    ArrayList<String> SID_List = new ArrayList<String>();
    Scanner keyboard = new Scanner(System.in);

    private void clearScreen()
    {
        // Work around.
        System.out.print("\033hH\033[2J");
        System.out.flush();
    }

    private void readBarCodes()
    {
        System.out.println("Waiting to scan barcodes. Type \"stop\" to end.");
        String inputVal;
        int i = 1;
        while (true) {
            System.out.printf("Barcode %d: ", i);
            inputVal = keyboard.nextLine();
            if (inputVal.matches("^\\d{9}$")) {
                clearScreen();
                SID_List.add(inputVal);
                ++i;
            }
            else if (inputVal.toUpperCase().equals("STOP"))
                break;
            else
                System.out.println("Does not appear like an SID");
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
                TokenFile.getRoot(accessKey), "club.dat");
        }
        catch (TokenFile.NoToken e) {
            System.out.println("\nCould not find a file associated with the given access key.\n");
	    throw e;
        }
        clearScreen();
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
