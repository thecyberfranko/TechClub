import java.util.ArrayList;
import java.io.File;
import java.util.Scanner;

public class TokenFile
{
    public static class NoToken extends Exception{}

    private static boolean containsHash(File tokenFile, String Password) throws Exception
    {
        Scanner tokenContents = new Scanner(tokenFile, "UTF8");
        return (tokenContents.hasNext() &&
               HashPassword.hashCheck(tokenContents.nextLine(), Password));
    }

    private static ArrayList listRoots()
    {
        ArrayList roots;
        File mountsFile = new File("/proc/mounts");
        while (mountsFile.hasNext()) {
            String line = mountsFile.nextLine();
            roots.add(line.split(" "));
        }
        return roots;
    }

    public static File getRoot(String Password) throws NoToken, Exception
    {
        File tokenFile;
        for(File root: File.listRoots()) {
            tokenFile = new File(root, "token.txt");
            if (tokenFile.exists() && containsHash(tokenFile, Password)) {
                return root;
            }
        }
        throw new NoToken();
    }

    public static void main(String[] args) throws Exception
    {
        try {
            System.out.println(getRoot("Jonathan Niehenke"));
        }
        catch (NoToken e) {
            System.out.println("Could not find authenticating token.");
        }
    }

}
