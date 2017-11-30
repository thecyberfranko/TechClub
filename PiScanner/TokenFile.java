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

    private static File[] listRoots() throws Exception

    {
        ArrayList<File> roots = new ArrayList<File>();
        File mountsFile = new File("/proc/mounts");
	Scanner fileReader = new Scanner(mountsFile);
        while (fileReader.hasNext()) {
            String line = fileReader.nextLine();
            String[] splitLine = line.split(" ");
            if (splitLine[0].startsWith("/dev/sd"))
                roots.add(new File(splitLine[1]));
        }
        return roots.toArray(new File[0]);
    }

    public static File getRoot(String Password) throws NoToken, Exception
    {
        File tokenFile;
	File roots[] = System.getProperty("os.name").startsWith("Windows") ?
		File.listRoots() : listRoots();
        for(File root: roots) {
            tokenFile = new File(root, "file.txt");
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
