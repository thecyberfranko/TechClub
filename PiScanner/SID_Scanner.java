import java.io.File;
import java.util.Scanner;

public class SID_Scanner
{
    File tokenFile;
    String[] SID_List;

    private void readBarCodes()
    {
        final int Size = 3;
        System.out.println("Reading barcodes...");
        Scanner keyboard = new Scanner(System.in);
        SID_List = new String[Size];
        for (int i = 0; i < Size; ++i) {
            System.out.printf("Barcode %d: ", i);
            SID_List[i] = keyboard.nextLine();
        }
        System.out.println("Press Enter to continue");
        keyboard.nextLine();
    }

    public SID_Scanner() throws Exception
    {
        try {
            tokenFile = new File(
                TokenFile.getRoot("1PiSc@nner4T3chClub"), "test.dat");
        }
        catch (TokenFile.NoToken e) {
            System.out.println("Could not find authenticating token.");
            throw e;
        }
        readBarCodes();
        System.out.println("Encrypt to file");
        EncryptList.encryptToFile(
            tokenFile, "JonathanNiehenke", SID_List);
    }

    public static void main(String[] args) throws Exception
    {
        SID_Scanner Instance = new SID_Scanner();
    }
}
