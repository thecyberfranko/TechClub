import java.io.File;

public class SID_Decrypter
{
    public static void main(String[] args) throws Exception
    {
        File tokenFile;
        try {
            tokenFile = new File(
                TokenFile.getRoot("1PiSc@nner4T3chClub"), "test.dat");
        }
        catch (TokenFile.NoToken e) {
            System.out.println("Could not find authenticating token.");
            throw e;
        }
        DecryptFile.display(tokenFile, "JonathanNiehenke");
    }
}
